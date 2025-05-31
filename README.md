Terkait pattern yang sering saya gunakan,
Saya sering menggunakan pattern separating folder, dimana saya menyimpan file di folder tertentu tergantung fungsinya.
Sebagai contoh, saat saya membuat aplikasi backend menggunakan expressJs, saya selalu membuat folder controllers dimana folder ini
akan berisi service dan api, dan juga beberapa tambahan seperti validasi menggunakan zod/yup. lalu kalau di frontend menggunakan react
saya akan membuat sebuah folder pages, dan didalam nya bukan berisi file melainkan folder lagi untuk halaman yang akan ditampilkan.
Misal di folder pages ada folder user untuk halaman user, disini bisa ada beberapa folder lagi seperti data atau partials yang berisi komponen
yang hanya di ada di page user.

Kenapa saya menyukai pattern ini? karena dengan pattern ini, setiap fungsi benar-benar terpisah, jadi kalau ada suatu kesalahan, saya tidak perlu
melakukan debugging pada file yang memanggil fungsi yang dipanggil, tapi saya tinggal debugging pada source nya
