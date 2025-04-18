import {TrashIcon} from '@sanity/icons'

export const deleteDocumentAction = (prev, context) => {
  const {documentId, schemaType} = context
  
  // Thêm action xóa vào tất cả các document
  return [
    ...prev,
    {
      icon: TrashIcon,
      label: 'Xóa',
      onHandle: async () => {
        // Hiển thị dialog xác nhận
        if (window.confirm(`Bạn có chắc chắn muốn xóa document này không? Hành động này không thể hoàn tác.`)) {
          try {
            // Sử dụng Sanity client để xóa document
            const client = context.getClient({apiVersion: '2023-05-03'})
            await client.delete(documentId)
            
            // Chuyển hướng về trang danh sách sau khi xóa
            window.location.href = '/desk'
          } catch (err) {
            console.error('Lỗi khi xóa document:', err)
            window.alert(`Lỗi khi xóa: ${err.message || 'Có lỗi xảy ra'}`)
          }
        }
      },
      tone: 'critical',
    },
  ]
}
