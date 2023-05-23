<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('remove_profile')]
final class RemoveProfileComponent
{
    public object $form;
}
