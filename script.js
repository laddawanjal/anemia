// เปิดการใช้กล้อง
const video = document.getElementById('video');

// ตรวจสอบว่าเบราว์เซอร์รองรับหรือไม่
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

// จับภาพและส่งไปยัง API
document.getElementById('snap').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 640, 480);
    
    // แปลงภาพเป็น blob และส่งไปยัง API
    canvas.toBlob(function(blob) {
        const formData = new FormData();
        formData.append('file', blob, 'eye.jpg');
        
        fetch('http://172.16.42.86:5500/analyze', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.textContent = `Blood level: ${data.blood_level}`;
        })
        .catch(error => console.error('Error:', error));
        
        });
    });

