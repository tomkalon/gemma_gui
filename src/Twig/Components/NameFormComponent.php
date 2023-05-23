<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('name_form')]
final class NameFormComponent
{
    public object $form;
}
