<?php

namespace App\Controller;

use App\Entity\Objects;
use App\Form\ChangeSettingsProfileType;
use App\Repository\SettingsRepository;
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

    #[Route('/app/{object_number<\d+>}', name: 'app_show_selected', priority: 5)]
    public function showSelectedObject($object_number): Response
    {
        return $this->render('app/index.html.twig', [
            'selectedObject' => $object_number
        ]);
    }

    #[Route('/app/{object<\d+>}/setup', name: 'app_show_selected_setup', priority: 5)]
    public function showSelectedObjectSetup(Request $request, AlertsManager $alertsManager, SettingsRepository $settingsRepository,
                                            Objects $object): Response
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
        $settings_names = $settingsRepository->getAllNames();
        return $this->render('app/setup.html.twig', [
            'selectedObject' => $object,
            'object' => $object,
            'settings_names' => $settings_names,
            'alerts' => $alerts['alerts'],
            'numberOfAlerts' => $alerts['numberOfAlerts'],
            'numberOfPages' => $alerts['numberOfPages'],
            'select_profile_form' => $form
        ]);
    }
}