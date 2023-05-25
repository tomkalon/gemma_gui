<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class LoginController extends AbstractController
{
    #[Route('/login', name: 'login_login')]
    public function index(AuthenticationUtils $authenticationUtils): Response
    {
        $last_username = $authenticationUtils->getLastUsername();
        $last_error = $authenticationUtils->getLastAuthenticationError();

        return $this->render('login/index.html.twig', [
            'lastUsername' => $last_username,
            'lastError' => $last_error
        ]);
    }
    #[Route('/logout', name: 'login_logout')]
    public function logout()
    {
    }
}
