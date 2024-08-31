const LIFF_ID = '1655873446-MpmBPPzl';
$(document).ready(() => {
    liff.init({ liffId: LIFF_ID }, () => {
        if (liff.isLoggedIn()) {
            console.log('LIFF is logged in');
        } else {
            liff.login({
                redirectUri: window.location.href
            });
        }
    }, (error) => {
        console.error('Error:', error);
    });
})

$('#submissionForm').submit((e) => {
    e.preventDefault();
    Swal.fire({
        icon: 'info',
        title: 'กำลังส่งข้อมูล...',
        html: 'กรุณารอสักครู่',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });
    const data = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        address: $('#address').val(),
        uid: liff.getDecodedIDToken().sub,
        opt: 'save'
    };
    console.log('Sending data:', data);
    // $.ajax({
    //     url: 'https://script.google.com/macros/s/AKfycbyiIo-xijWCLAVkDbYmZMzzw6gI9gd0THO82_zpUmwe0Zc2NeJWAW-hKr_I2X4lHGlH/exec',
    //     method: 'POST',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json',
    //     success: (data) => {
    //         if (data.status == 'success') {
    //             console.log('Response from Google Apps Script:', data);
    //             $('#submissionForm').trigger('reset');

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'สำเร็จ!',
    //                 text: 'ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!',
    //                 confirmButtonText: 'รับทราบ',
    //             })
    //             $('.card').remove()
    //             $('.col-12').append('<div class="alert alert-primary text-center p-3 mt-4" role="alert"><div class="fw-bold"><i class="bi bi-check-circle-fill"></i>ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!</div><div>ขอบคุณสำหรับการส่งข้อมูล</div></div>')

    //         } else {
    //             console.error('Error:', data);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'เกิดข้อผิดพลาด!',
    //                 text: 'กรุณาลองใหม่อีกครั้ง!',
    //                 confirmButtonText: 'ปิด',
    //             });
    //         }
    //     },
    //     error: (error) => {
    //         console.error('Error:', error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'เกิดข้อผิดพลาด!',
    //             text: 'กรุณาลองใหม่อีกครั้ง!',
    //             confirmButtonText: 'ปิด',
    //         });
    //     }
    // });

    $.post('https://script.google.com/macros/s/AKfycbyiIo-xijWCLAVkDbYmZMzzw6gI9gd0THO82_zpUmwe0Zc2NeJWAW-hKr_I2X4lHGlH/exec', data, function(res) {
        if (res.status == 'success') {
            console.log('Response from Google Apps Script:', res);
            $('#submissionForm').trigger('reset');
            liff.sendMessages([{
                type: 'text',
                text: `👉 ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!

ชื่อ: ${data.name}
อีเมล: ${data.email}
เบอร์โทร: ${data.phone}
ที่อยู่: ${data.address}`
            }]).then(() => {
                console.log('Message sent');
            }).catch((error) => {
                console.error('Error:', error);
            });
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ!',
                text: 'ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!',
                confirmButtonText: 'รับทราบ',
                showCancelButton: true,
                cancelButtonText: 'ปิด',
            }).then((result) => {
                if (result.isDismissed) {
                    liff.closeWindow();
                }
            })
            $('.card').remove()
            $('.col-12').append(`<div class="d-flex justify-content-center">
                <div class="alert alert-primary text-center p-3 mt-4" style="max-width: 700px" role="alert">
                    <div class="fw-bold"><i class="bi bi-check-circle-fill"></i>  ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!</div>
                    <div>ขอบคุณสำหรับการส่งข้อมูล</div>
                    <!-- กรอกข้อมูลอีกครั้ง -->
                    <button class="btn btn-link" onclick="location.reload()">
                        <i class="bi bi-arrow-repeat"></i>
                        กรอกข้อมูลอีกครั้ง</button>
                </div>
            </div>`)

        } else {
            console.error('Error:', data);
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
                text: 'กรุณาลองใหม่อีกครั้ง!',
                confirmButtonText: 'ปิด',
            });
        }
    })
});