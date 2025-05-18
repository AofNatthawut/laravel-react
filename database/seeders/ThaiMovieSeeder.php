<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThaiMovieSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('thai_movies')->insert([
            [
                'title' => 'KinnPorsche The Series',
                'description' => 'เรื่องราวของทายาทมาเฟียและบอดี้การ์ด ที่ต้องเผชิญความรักและอันตรายไปพร้อมกัน',
                'director' => 'Kongkiat Khomsiri',
                'year' => 2022,
                'image' => 'https://www.themoviedb.org/t/p/original/hdPLe50HbZHsETXQRcIP8gw7cKz.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'I Told Sunset About You แปลรักฉันด้วยใจเธอ',
                'description' => 'ความรักของเพื่อนสนิทในวัยเรียนที่ค่อยๆ พัฒนาเป็นความรู้สึกลึกซึ้ง',
                'director' => 'Naruebet Kuno',
                'year' => 2020,
                'image' => 'https://media.timeout.com/images/105766833/image.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Tha Miracle of Teddy Bear คุณหมีปาฏิหาริย์',
                'description' => 'ปาฏิหาริย์เริ่มขึ้นในเช้าวันหนึ่งหลังจาก พีรณัฐ กู้วงออกไปทำงาน บรรดาข้าวของในห้องของชายหนุ่มก็ตื่นจากสภาพหลับใหลขึ้นมามีชีวิตเหมือนเช่นทุกครั้ง หนึ่งในนั้นคือ เต้าหู้ ตุ๊กตาหมีสีขาวนวล',
                'director' => 'เผ่าทอง ทองเจือ',
                'year' => 2023,
                'image' => 'https://s359.kapook.com/pagebuilder/fa1baf08-9428-45ec-9930-905dac4b84ff.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'SOTUS: The Series',
                'description' => 'รักที่เริ่มต้นจากการรับน้องในรั้วมหาวิทยาลัย',
                'director' => 'Jane Botta',
                'year' => 2016,
                'image' => 'https://th.bing.com/th/id/R.d465ff3cc1fd83fe0c1c19f4f14f1bfa?rik=Y0zHSBgTKB%2f8aA&pid=ImgRaw&r=0',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Love By Chance บังเอิญรัก',
                'description' => 'ความบังเอิญที่ทำให้สองหนุ่มต้องมาพัวพันกันจนเกิดเป็นความรัก',
                'director' => 'Siwaj Sawatmaneekul',
                'year' => 2018,
                'image' => 'https://th.bing.com/th/id/OIP.YfhhUq9MCYCy9ZdzmQWGVgHaK5?rs=1&pid=ImgDetMain',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Kiss Me Agian จูบให้ได้ถ้านายแน่จริง',
                'description' => 'เป็นซีรีส์ภาคต่อ ซึ่งเป็นเนื้อเรื่องก่อนหน้าและคาบเกี่ยวกันกับ Kiss the Series รักต้องจูบ',
                'director' => 'แสงอรุณ วรรณจู',
                'year' => 2018,
                'image' => 'https://dizi-mania.com/wp-content/uploads/2019/06/Kiss-me-Again-the-series-724x1024.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
