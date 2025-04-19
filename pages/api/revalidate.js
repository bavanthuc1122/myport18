import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

// Bí mật dùng để xác thực webhook từ Sanity
const secret = process.env.SANITY_WEBHOOK_SECRET || 'your-webhook-secret';

export default async function handler(req, res) {
  // Chỉ chấp nhận POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Xác thực webhook từ Sanity
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  const body = await readBody(req); // Đọc body dưới dạng text

  if (!isValidSignature(body, signature, secret)) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  try {
    const jsonBody = JSON.parse(body);
    const { _type, _id } = jsonBody;

    // Xác định trang nào cần được cập nhật dựa trên loại nội dung
    let pagesToRevalidate = [];

    // Xác định các trang cần cập nhật dựa trên loại nội dung thay đổi
    switch (_type) {
      case 'portfolioItem':
        pagesToRevalidate = ['/', '/portfolio'];
        break;
      case 'btsSection':
        pagesToRevalidate = ['/', '/bts'];
        break;
      case 'contactInfo':
        pagesToRevalidate = ['/', '/contact'];
        break;
      case 'heroSection':
      case 'portfolioPreview':
        pagesToRevalidate = ['/'];
        break;
      case 'aboutSection':
        pagesToRevalidate = ['/', '/about'];
        break;
      case 'category':
        pagesToRevalidate = ['/', '/portfolio'];
        break;
      default:
        // Mặc định cập nhật trang chủ
        pagesToRevalidate = ['/'];
    }

    // Thực hiện cập nhật cho từng trang
    const revalidateResults = [];

    for (const path of pagesToRevalidate) {
      try {
        await res.revalidate(path);
        revalidateResults.push({ path, success: true });
      } catch (error) {
        console.error(`Error revalidating ${path}:`, error);
        revalidateResults.push({ path, success: false, error: error.message });
      }
    }

    return res.status(200).json({
      message: 'Revalidation triggered successfully',
      revalidated: revalidateResults,
      type: _type,
      id: _id
    });
  } catch (error) {
    console.error('Error revalidating pages:', error);
    return res.status(500).json({
      message: 'Error revalidating pages',
      error: error.message
    });
  }
}

// Helper function để đọc request body
async function readBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
