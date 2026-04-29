# Khắc phục lỗi thứ tự Hooks trong React

## Vấn đề

React yêu cầu các hooks phải được gọi theo cùng một thứ tự trong mỗi lần render. Nếu thứ tự hooks thay đổi giữa các lần render, React sẽ hiển thị lỗi:

```
React has detected a change in the order of Hooks called by [Component]. 
This will lead to bugs and errors if not fixed.
```

## Nguyên nhân

Lỗi này thường xảy ra khi:

1. Sử dụng hooks trong điều kiện (if/else)
2. Sử dụng hooks trong vòng lặp
3. Gọi hooks từ các hàm thông thường (không phải component hoặc custom hook)
4. Thứ tự gọi hooks thay đổi giữa các lần render
5. Sử dụng hooks trong các custom hooks mà không đảm bảo thứ tự nhất quán

## Cách khắc phục

### 1. Đảm bảo thứ tự hooks nhất quán

Luôn gọi hooks theo cùng một thứ tự trong mỗi lần render:

```jsx
// ✅ Đúng: Thứ tự hooks nhất quán
function Component() {
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(null);
  const ref = useRef(null);
  
  useEffect(() => {
    // ...
  }, []);
  
  // ...
}
```

### 2. Không sử dụng hooks trong điều kiện

```jsx
// ❌ Sai: Hook trong điều kiện
function Component() {
  if (condition) {
    const [state, setState] = useState(false);
  }
  
  // ...
}

// ✅ Đúng: Hook luôn được gọi
function Component() {
  const [state, setState] = useState(false);
  
  if (condition) {
    // Sử dụng state ở đây
  }
  
  // ...
}
```

### 3. Đảm bảo thứ tự hooks trong custom hooks

Khi sử dụng custom hooks, cần đảm bảo thứ tự gọi hooks trong custom hook và component sử dụng nó là nhất quán:

```jsx
// Custom hook
function useCustomHook() {
  const [state, setState] = useState(false);
  // ...
  return { state };
}

// Component sử dụng custom hook
function Component() {
  // Đảm bảo useState được gọi trước useCustomHook
  const [localState, setLocalState] = useState(false);
  const { state } = useCustomHook();
  
  // ...
}
```

### 4. Sử dụng memoization để tránh tính toán lại

Nếu bạn cần tính toán giá trị phức tạp, hãy sử dụng useMemo thay vì tính toán trực tiếp:

```jsx
// ✅ Đúng: Sử dụng useMemo
function Component() {
  const [data, setData] = useState([]);
  
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);
  
  // ...
}
```

## Các thay đổi đã thực hiện

Trong dự án này, chúng tôi đã thực hiện các thay đổi sau để khắc phục lỗi thứ tự hooks:

1. **useFramerMotion.js**:
   - Đơn giản hóa hook bằng cách loại bỏ state không cần thiết
   - Để framer-motion tự xử lý SSR

2. **AnimatedSection.jsx**:
   - Đảm bảo useState được gọi trước useFramerMotion
   - Giữ thứ tự hooks nhất quán

3. **ScrollContainer.jsx**:
   - Đảm bảo useState được gọi trước useLocomotive
   - Giữ thứ tự hooks nhất quán

4. **useLocomotive.js**:
   - Sắp xếp lại thứ tự hooks để đảm bảo tính nhất quán
   - Đặt useState trước useRef

## Quy tắc chung khi sử dụng hooks

1. Luôn gọi hooks ở cấp cao nhất của component hoặc custom hook
2. Không gọi hooks trong điều kiện, vòng lặp hoặc hàm lồng nhau
3. Đảm bảo thứ tự hooks nhất quán giữa các lần render
4. Khi sử dụng custom hooks, hãy cẩn thận với thứ tự hooks
5. Sử dụng ESLint plugin `eslint-plugin-react-hooks` để phát hiện lỗi
