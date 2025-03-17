<?php

namespace App\Helpers;

class ImageHelper
{
    public static function generateLetterImage(
        string $name,
        int $width = 200,
        int $height = 200,
        string $backgroundColor = '#FFCCCC',
        string $textColor = '#FF0000',
        int $fontSize = 80,
        string $fontPath = null
    ): ?string {
        $firstLetter = strtoupper(mb_substr($name, 0, 1));

        if(empty($firstLetter)){
            return null;
        }

        $image = imagecreatetruecolor($width, $height);

        $bgColor = self::hexToRgb($backgroundColor);
        if($bgColor === false){
            return null;
        }
        $backgroundColor = imagecolorallocate($image, $bgColor['r'], $bgColor['g'], $bgColor['b']);
        imagefill($image, 0, 0, $backgroundColor);

        $textColor = self::hexToRgb($textColor);
        if($textColor == false){
            return null;
        }
        $textColor = imagecolorallocate($image, $textColor['r'], $textColor['g'], $textColor['b']);

        if(!$fontPath){
            $fontPath = public_path('/assets/fonts/Inter_18pt-Medium.ttf');
        }

        if(!file_exists($fontPath)){
            return  null;
        }

        $textBox = imagettfbbox($fontSize, 0, $fontPath, $firstLetter);
        $textWidth = abs($textBox[2] - $textBox[0]);
        $x = ($width / 2) - ($textWidth / 2);
        $y = ($height / 2) + ($fontSize / 2) - ($fontSize * 0.1);

        imagettftext($image, $fontSize, 0, $x, $y, $textColor, $fontPath, $firstLetter);

        ob_start();
        imagepng($image);
        $imageData = ob_get_contents();
        ob_end_clean();
        imagedestroy($image);

        return 'data:image/png;base64,' . base64_encode($imageData);
    }

    private static function hexToRgb(string $hex): array|false
    {
        $hex = str_replace('#', '', $hex);
        if (strlen($hex) === 3) {
            $hex = str_repeat(substr($hex, 0, 1), 2) . str_repeat(substr($hex, 1, 1), 2) . str_repeat(substr($hex, 2, 1), 2);
        }
        if (strlen($hex) !== 6) {
            return false;
        }
        return [
            'r' => hexdec(substr($hex, 0, 2)),
            'g' => hexdec(substr($hex, 2, 2)),
            'b' => hexdec(substr($hex, 4, 2)),
        ];
    }


}
