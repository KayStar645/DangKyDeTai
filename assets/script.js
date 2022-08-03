function checkDangKyTaiKhoan() {

    //DOM lấy thông tin từ người dùng
    var MSSV = document.getElementById('mssv').value;
    var hoTen = document.getElementById('hoTen').value;
    var pass = document.getElementById('pass').value;
    var rePass = document.getElementById('RePass').value;

    //Giả sử ban đầu chưa có lỗi
    document.getElementById("mssvError").style.color = "#fff";
    document.getElementById("hoTenError").style.color = "#fff";
    document.getElementById("PassError").style.color = "#fff";
    document.getElementById("RePassError").style.color = "#fff";
    var flag = true;

    //MSSV đúng phải có 10 kí số - Cần cải tiến code
    if (MSSV.length != 10) {
        flag = false;
        document.getElementById("mssvError").style.color = "red";

        if(MSSV.length == 0) {
            document.getElementById("mssvError").innerHTML = "Vui lòng nhập MSSV!";
        } else {
            document.getElementById("mssvError").innerHTML = "MSSV không hợp lệ! (Đủ 10 số!)";
        }


    } else {
        for (var TK in localStorage){
            var x = JSON.parse(localStorage.getItem(TK));
            if(x == null)
                break;
            if(MSSV == x.mssv) {
                flag = false;
                document.getElementById("mssvError").innerHTML="MSSV này đã đăng ký tài khoản!";
                document.getElementById("mssvError").style.color = "red";
            }
        }
    }

    //Bắt buộc phải nhập tên - Chúng ta có thể đưa ds lớp lên đầy bằng cách chạy 
    // 1 đoạn code lưu thông tin lớp vào localStorage - Nếu sinh viên k có trong lớp thì
    // không cho đăng kí
    if(hoTen.length == "") {
        flag = false;
        document.getElementById("hoTenError").style.color = "red";
        document.getElementById("hoTenError").innerHTML = "Vui lòng nhập họ và tên!";
    }

    if(pass.length < 6)
    {
        flag = false;
        document.getElementById("PassError").style.color = "red";
        if(pass.length == 0) {
            document.getElementById("PassError").innerHTML = "Vui lòng nhập mật khẩu!";
        } else {
            document.getElementById("PassError").innerHTML = "Mật khẩu phải đủ 6 kí tự!";
        }
    }

    if(rePass != pass) {
        flag = false;
        document.getElementById("RePassError").style.color = "red";
        if(rePass.length == 0) {
            document.getElementById("RePassError").innerHTML = "Vui lòng nhập lại mật khẩu!";    
        } else {
            document.getElementById("RePassError").innerHTML = "Mật khẩu không khớp!";
        }
    }

    if(!flag)
        return false;

    //Tạo đối tượng
    let taiKhoan = {
        mssv: MSSV,
        matKhau: pass,
        tenNhom: "",
        tenDeTai: "",
        DSSV: [
            {
                mssv: "",
                hoTen: ""
            },
            {
                mssv: "",
                hoTen: ""
            },
            {
                mssv: "",
                hoTen: ""
            }
        ],
        nhom: false,
        DeTai: false
    }

    taiKhoan.DSSV[0].mssv = MSSV;
    taiKhoan.DSSV[0].hoTen = hoTen;


    localStorage.setItem(MSSV, JSON.stringify(taiKhoan));
    window.location = '../../index.html';
}

function checkDangNhap() {

    var MSSV = document.getElementById('MSSV').value;
    var pass = document.getElementById('pass').value;

    document.getElementById("MSSVError").innerHTML = "";
    document.getElementById("PassError").innerHTML = "";

    var flag = true;
    var taiKhoan = JSON.parse(localStorage.getItem(MSSV));

    if (taiKhoan == null) {
        flag = false;
        document.getElementById("MSSVError").innerHTML="MSSV không hợp lệ!";
        document.getElementById("MSSVError").style.color = "red";
        document.getElementById("MSSVError").style.display = "block";
        document.getElementById("MSSVError").style.marginTop = "10px";
        return flag;
    }

    if(pass != taiKhoan.matKhau) {
        flag = false;
        document.getElementById("PassError").innerHTML="Mật khẩu không khớp!";
        document.getElementById("PassError").style.color = "red";
        document.getElementById("PassError").style.display = "block";
        document.getElementById("PassError").style.marginTop = "10px";
    }

    if(!flag)
    return false;

    var taiKhoan = JSON.parse(localStorage.getItem(MSSV));
    localStorage.setItem("new", JSON.stringify(taiKhoan));

    if(taiKhoan.nhom == false) {
        window.location = './assets/HTML/DangKyNhom.html';
    } else if(taiKhoan.DeTai == false) {
        window.location = './assets/HTML/DangKyDeTai.html';
    } else {
        //Chuyển tới trang web mới
    }

}

function onload_DK_Nhom() {
    var taiKhoan = JSON.parse(localStorage.getItem("new"));

    document.getElementsByClassName("info_mssv")[0].value = taiKhoan.DSSV[0].mssv;
    document.getElementsByClassName("info_name")[0].value = taiKhoan.DSSV[0].hoTen;
 }

function checkDangKyNhom() {

    var flag = true;
    let taiKhoan = JSON.parse(localStorage.getItem("new"));

    //Lấy thông tin và kiểm tra tên nhóm
    document.getElementById('errorNameGroup').innerHTML = "";
    taiKhoan.tenNhom = document.getElementById('nameGroup').value;
    
    if(taiKhoan.tenNhom == "" || taiKhoan.tenNhom < 2) {
        flag = false;
        document.getElementById('errorNameGroup').style.color = "red";
        document.getElementById('errorNameGroup').style.marginTop = "10px";
        document.getElementById('errorNameGroup').innerHTML = "Tên nhóm không hợp lệ!";
    } else {
        for (var key in localStorage) {
            var tk = JSON.parse(localStorage.getItem(key));
            if(tk == null)
                break;
            if(taiKhoan.tenNhom == tk.tenNhom)
            {
                flag = false;
                document.getElementById('errorNameGroup').style.color = "red";
                document.getElementById('errorNameGroup').style.marginTop = "10px";
                document.getElementById('errorNameGroup').innerHTML = "Tên nhóm đã tồn tại!";
            }
        }         
    }

    //Lấy thông tin số lượng
    var number = document.getElementById('number').value;

    //Xóa các lỗi nhập của thông tin sinh viên
    var error_mssv = document.getElementsByClassName('mssvError');
    var error_name = document.getElementsByClassName('nameError');
    for(var i = 0; i < 3; i++) {
        error_mssv[i].style.color = "red";
        error_mssv[i].style.position = "absolute";
        error_mssv[i].style.top = "70%";
        error_mssv[i].style.left = "50px";
        error_mssv[i].innerHTML = "";

        error_name[i].innerHTML = "";
        error_name[i].style.color = "red";
        error_name[i].style.position = "absolute";
        error_name[i].style.top = "70%";
        error_name[i].style.right = "25%";
    }

    //Lấy thông tin sinh viên
    var info_mssv = document.getElementsByClassName('info_mssv');
    var info_name = document.getElementsByClassName('info_name');
     //Gán thông tin sinh viên
     for(var i = 0; i < number; i++) {
        taiKhoan.DSSV[i].mssv = info_mssv[i].value;
        taiKhoan.DSSV[i].hoTen = info_name[i].value;
    }
    
    for(var i = 1; i < number; i++) {
        //error_mssv[i].innerHTML = "";
        //Lấy thông tin sinh viên
        var sv_MSSV = info_mssv[i].value;
        var sv_HoTen = info_name[i].value;

        //Kiểm tra thông tin sinh viên hợp lệ
        if (sv_MSSV.length != 10) {
            flag = false;
            error_mssv[i].innerHTML="Vui lòng kiểm tra lại MSSV!";
        }
        if(sv_HoTen.length < 3) {
            flag = false;
            error_name[i].innerHTML="Tên tối thiểu 3 kí tự!";
        }

        //Kiểm tra trùng lặp sinh viên với các nhóm khác
        for (var key in localStorage) {
            var tk = JSON.parse(localStorage.getItem(key));
            if(tk == null)
                break;
            if(tk.tenNhom != taiKhoan.tenNhom) {
                if(sv_MSSV == tk.DSSV[0].mssv ||
                    sv_MSSV == tk.DSSV[1].mssv ||
                      sv_MSSV == tk.DSSV[2].mssv) {
                    flag = false;
                    error_mssv[i].innerHTML="Sinh viên này đã đăng kí nhóm rồi!";
                }
            }
        }
    }

    //Kiểm tra trùng thành viên trong nhóm
    for(var i = 0; i < number - 1; i++) {
        for(var j = i + 1; j < number; j++) {
            if(taiKhoan.DSSV[i].mssv == taiKhoan.DSSV[j].mssv) {
                flag = false;
                //error_mssv[i].innerHTML = "Sinh viên này đã đăng kí nhóm rồi!";
                error_mssv[j].innerHTML = "Sinh viên này đã đăng kí nhóm rồi!";
            }
        }
    }

    if(taiKhoan.nhom) {
        flag = false;
        alert("Bạn đã đăng ký nhóm rồi, không thể đăng ký lại!")
    }

    if(!flag)
        return false;

    taiKhoan.nhom = true;
    localStorage.setItem(taiKhoan.mssv, JSON.stringify(taiKhoan));
    localStorage.setItem("new", JSON.stringify(taiKhoan));

    if(taiKhoan.DeTai == false) {
        window.location = './DangKyDeTai.html';
    } else {
        //Chuyển tới 1 trang mới
    }
}

function checkDangKyDeTai() {
    var taiKhoan = JSON.parse(localStorage.getItem("new"));

    if(taiKhoan.tenDeTai == null) {
        alert("Không được phép đăng ký lại!");
        return;
    }

    var deTai = document.getElementsByTagName('input');
    var tenDT = document.getElementsByClassName('DeTai');


    for(var i = 0; i < deTai.length; i++) {
        if(deTai[i].checked == true) {
            taiKhoan.tenDeTai = tenDT[i].innerHTML.replace(/\n/g, '').trim();
            
            if(taiKhoan.tenDeTai == "Khác.") {
                taiKhoan.tenDeTai = document.getElementById('deTaiChon').value;
            }
            if(taiKhoan.tenDeTai == "") {
                alert("Đăng ký không thành công!");    
                return;
            }
            
            localStorage.setItem(taiKhoan.mssv, JSON.stringify(taiKhoan));
            alert("Đăng ký thành công!");
            return;
        }
    }
}

function load() {
    
    table = `
        <tr>
            <th>STT</th>
            <th>Tên Nhóm</th>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Chức Danh</th>
            <th>Đề tài</th>
        </tr>`

        
        for (var key in localStorage) {
            if(key == "new")
                break;
            var taiKhoan = JSON.parse(localStorage.getItem(key));
            if(taiKhoan == null)
                break;
            if(taiKhoan.tenNhom == "")
                continue;
            var vt = 0;
            table += `
                <tr>
                    <td>${++vt}</td>
                    <td rowspan="3">${taiKhoan.tenNhom}</td>
                    <td>${taiKhoan.DSSV[0].mssv}</td>
                    <td>${taiKhoan.DSSV[0].hoTen}</td>
                    <td>${"Trưởng nhóm"}</td>
                    <td  rowspan="3">${taiKhoan.tenDeTai}</td>
                </tr>`
            
            table += `
                <tr>
                    <td>${++vt}</td>
                    
                    <td>${taiKhoan.DSSV[1].mssv}</td>
                    <td>${taiKhoan.DSSV[1].hoTen}</td>
                    <td>${"Thành viên"}</td>
                    
                </tr>`

            table += `
                <tr>
                    <td>${++vt}</td>
                    
                    <td>${taiKhoan.DSSV[2].mssv}</td>
                    <td>${taiKhoan.DSSV[2].hoTen}</td>
                    <td>${"Thành viên"}</td>
                    
                </tr>`

            table += `
                <tr style="background-color:#999;">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`
            
        }

    document.getElementById('table').innerHTML = table;
}

function del() {
    window.localStorage.clear();
    load();
}
