<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('info_popup')]
final class InfoPopupComponent
{
    public string $title;
    public string $message;
}
