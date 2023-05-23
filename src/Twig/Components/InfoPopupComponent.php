<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('info_popup')]
final class InfoPopupComponent
{
    public string $name;
    public string $title;
    public string $message;
    public object $form;
    public string $form_name;
    public bool $open;
}
