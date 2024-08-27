import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showAlert = (message) => {
  MySwal.fire({
    title: 'Thông báo',
    text: message,
    icon: 'success',
    confirmButtonText: 'OK'
  });
};

export const showErrorAlert = (message) => {
  MySwal.fire({
    title: 'Thao tác thất bại',
    text: message,
    icon: 'error',
    confirmButtonText: 'OK'
  });
};