import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showAlert = () => {
  MySwal.fire({
    title: 'Thông báo',
    text: 'Bạn đã thao tác thành công!',
    icon: 'success',
    confirmButtonText: 'OK'
  });
};

export const showErrorAlert = () => {
  MySwal.fire({
    title: 'Thao tác thất bại',
    text: 'Đã có lỗi xảy ra, vui lòng thử lại.',
    icon: 'error',
    confirmButtonText: 'OK'
  });
};