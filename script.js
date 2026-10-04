// ===== BƯỚC 6: LẤY PHẦN TỬ & TẠO BIẾN =====

// Lấy 2 dòng của màn hình từ HTML
let manHinh = document.getElementById("ket-qua");
let lichSu = document.getElementById("lich-su");

// Các biến "ghi nhớ" của máy tính
let soThuNhat = 0; // số người dùng nhập TRƯỚC khi bấm phép tính
let phepTinh = ""; // phép tính đang chọn: "+", "-", "*", "/" ("" = chưa chọn)
let choNhapSoMoi = false; // true = số bấm tiếp theo sẽ XÓA màn hình và bắt đầu số mới

// ===== BƯỚC 7: NHẬP SỐ =====

function nhapSo(so) {
  if (manHinh.textContent === "0" || choNhapSoMoi === true) {
    // Màn hình đang là 0, hoặc vừa bấm phép tính -> thay bằng số mới
    manHinh.textContent = so;
    choNhapSoMoi = false;

    // Nếu vừa tính xong (không còn phép tính nào) -> xóa dòng lịch sử cũ
    if (phepTinh === "") {
      lichSu.textContent = "";
    }
  } else {
    // Giới hạn tối đa 12 chữ số cho khỏi tràn màn hình
    if (manHinh.textContent.length >= 12) {
      return;
    }

    // Nối thêm chữ số vào phía sau
    manHinh.textContent = manHinh.textContent + so;
  }
}

// ===== BƯỚC 8: CHỌN PHÉP TÍNH =====

function chonPhepTinh(dau) {
  // Đang báo lỗi thì không làm gì
  if (manHinh.textContent === "Lỗi") {
    return;
  }

  // Bấm liên tiếp kiểu 2 + 3 -> × tính 2 + 3 trước
  if (phepTinh !== "" && choNhapSoMoi === false) {
    tinhKetQua();
  }

  soThuNhat = parseFloat(manHinh.textContent); // đổi chữ thành số
  phepTinh = dau;
  lichSu.textContent = soThuNhat + " " + phepTinh + " "; // VD: "12 +"
  choNhapSoMoi = true;
}

// ===== BƯỚC 9: TÍNH KẾT QUẢ (nút =) =====

function tinhKetQua() {
  // Chưa chọn phép tính thì không có gì để tính
  if (phepTinh === "") {
    return;
  }

  let soThuHai = parseFloat(manHinh.textContent);
  let ketQua = 0;

  if (phepTinh === "+") {
    ketQua = soThuNhat + soThuHai;
  } else if (phepTinh === "-") {
    ketQua = soThuNhat - soThuHai;
  } else if (phepTinh === "×") {
    ketQua = soThuNhat * soThuHai;
  } else if (phepTinh === "÷") {
    // Không được chia cho 0
    if (soThuHai === 0) {
      manHinh.textContent = "Lỗi";
      lichSu.textContent = "Không chia được cho 0";
      phepTinh = "";
      choNhapSoMoi = true;
      return;
    }

    ketQua = soThuNhat / soThuHai;
  }

  // Làm tròn để tránh kết quả xấu như 0.1 + 0.2 = 0.30000000000000004
  ketQua = parseFloat(ketQua.toFixed(8));

  // Hiện lên màn hình
  lichSu.textContent = soThuNhat + " " + phepTinh + " " + soThuHai + " =";
  manHinh.textContent = ketQua;

  // Chuẩn bị cho lần tính tiếp theo
  phepTinh = "";
  choNhapSoMoi = true;
}

// ===== BƯỚC 10: CÁC NÚT C, CE, % =====

// Nút C: xóa sạch mọi thứ, như mới bật máy
function xoaHet() {
  manHinh.textContent = "0";
  lichSu.textContent = "";
  soThuNhat = 0;
  phepTinh = "";
  choNhapSoMoi = false;
}

// Nút CE: chỉ xóa số đang nhập, vẫn giữ phép tính
function xoaSo() {
  manHinh.textContent = "0";
}

// Nút %: chia số đang hiện cho 100
function phanTram() {
  if (manHinh.textContent === "Lỗi") {
    return;
  }

  let so = parseFloat(manHinh.textContent);
  manHinh.textContent = so / 100;
}
