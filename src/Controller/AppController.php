<?php

namespace App\Controller;

use App\Entity\Objects;
use App\Form\ChangeSettingsProfileType;
use App\Form\ObjectInfoType;
use App\Service\AlertsManager\AlertsManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function index(): Response
    {
        return $this->render('test.html.twig', [
            'test' => 'test'
        ]);
    }

    #[Route('/app', name: 'app_show_all', priority: 10)]
    public function showAll(): Response
    {
        return $this->render('app/index.html.twig', [
            'selectedObject' => false
        ]);
    }

    #[Route('/app/{object<\d+>}', name: 'app_show_selected', priority: 5)]
    public function showSelectedObject($object): Response
    {
        return $this->render('app/index.html.twig', [
            'selectedObject' => $object
        ]);
    }

    #[Route('/app/{object<\d+>}/setup', name: 'app_show_selected_setup', priority: 5)]
    public function showSelectedObjectSetup(Request $request, AlertsManager $alertsManager, Objects $object): Response
    {
        $form = $this->createForm(ChangeSettingsProfileType::class, $object);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $form->getData();
            return $this->redirectToRoute('app_show_selected_setup', [
                'object' => $object->getId()
            ]);
        }

        $limit = 10;
        $alerts = $alertsManager->getAlerts($object, 0, 0, $limit);
        return $this->render('app/setup.html.twig', [
            'object' => $object,
            'alerts' => $alerts['alerts'],
            'numberOfAlerts' => $alerts['numberOfAlerts'],
            'numberOfPages' => $alerts['numberOfPages'],
            'select_profile_form' => $form
        ]);
    }

    #[Route('/app/{object<\d+>}/setup/edit', name: 'app_show_selected_setup_edit', priority: 5)]
    public function showSelectedObjectSetupEdit(Request $request, Objects $object): Response
    {
        $form = $this->createForm(ObjectInfoType::class, $object);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $form->getData();
            return $this->redirectToRoute('app_show_selected_setup', [
                'object' => $object->getId()
            ]);
        }

        return $this->render('app/edit_info.html.twig', [
            'object' => $object,
            'selectedObject' => $object,
            'form' => $form
        ]);
    }
}