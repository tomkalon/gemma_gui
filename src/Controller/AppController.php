<?php

namespace App\Controller;

use App\Entity\Objects;
use App\Entity\Settings;
use App\Form\ChangeSettingsProfileNameType;
use App\Form\ChangeSettingsProfileType;
use App\Form\ObjectInfoType;
use App\Repository\ObjectsRepository;
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

    #[Route('/app/{object<\d+>}', name: 'app_show_selected', priority: 5)]
    public function showSelectedObject($object): Response
    {
        return $this->render('app/index.html.twig', [
            'selectedObject' => $object
        ]);
    }

    #[Route('/app/{object<\d+>}/setup', name: 'app_show_selected_setup', priority: 5)]
    public function showObjectSetup(Request $request, AlertsManager $alertsManager, Objects $object, ObjectsRepository $objectsRepository): Response
    {
        $form = $this->createForm(ChangeSettingsProfileType::class, $object);

        // form handling
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $object = $form->getData();

            // update data
            $objectsRepository->save($object, true);

            // flash message
            $this->addFlash('success', 'Profil ustawień został zaktualizowany!');

            // redirection
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

    #[Route('/app/{object<\d+>}/setup/edit_info', name: 'app_show_selected_setup_edit_info', priority: 5)]
    public function objectSetupEditInfo(Request $request, Objects $object, ObjectsRepository $objectsRepository): Response
    {
        $form = $this->createForm(ObjectInfoType::class, $object);
        $form->handleRequest($request);

        // form handling
        if ($form->isSubmitted() && $form->isValid()) {
            $object = $form->getData();

            // update data
            $objectsRepository->save($object, true);

            // flash message
            $this->addFlash('success', 'Dane zostały poprawnie zapisane!');

            // redirection
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
    #[Route('/app/{object<\d+>}/setup/edit_profile', name: 'app_show_selected_setup_edit_profile', priority: 5)]
    public function objectSetupEditProfile(Request $request, Objects $object, ObjectsRepository $objectsRepository): Response
    {
        $formChangeProfile = $this->createForm(ChangeSettingsProfileType::class, $object);
        $formChangeProfile->handleRequest($request);

        // form handling
        if ($formChangeProfile->isSubmitted() && $formChangeProfile->isValid()) {
            $object = $formChangeProfile->getData();

            // update data
            $objectsRepository->save($object, true);

            // flash message
            $this->addFlash('success', 'Dane zostały poprawnie zapisane!');

            // redirection
            return $this->redirectToRoute('app_show_selected', [
                'object' => $object->getId()
            ]);
        }

        return $this->render('app/edit_profile.html.twig', [
            'object' => $object,
            'selectedObject' => $object,
            'select_profile_form' => $formChangeProfile
        ]);
    }

    #[Route('/app/show_all_profiles', name: 'app_show_all_profiles', priority: 5)]
    public function showAllProfiles(SettingsRepository $settingsRepository): Response
    {
        $settings = $settingsRepository->findAll();
        return $this->render('app/edit_all_profiles.html.twig', [
            'settings' => $settings
        ]);
    }


    #[Route('/app/edit_profile_name/{setup<\d+>}', name: 'app_edit_profile_name', priority: 5)]
    public function editProfileName(Request $request, Settings $setup, SettingsRepository $settingsRepository): Response
    {
        $formChangeProfileName = $this->createForm(ChangeSettingsProfileNameType::class, $setup);
        $formChangeProfileName->handleRequest($request);

        // form handling
        if ($formChangeProfileName->isSubmitted() && $formChangeProfileName->isValid()) {
            $setup = $formChangeProfileName->getData();

            // update data
            $settingsRepository->save($setup, true);

            // flash message
            $this->addFlash('success', 'Dane zostały poprawnie zapisane!');

            // redirection
            return $this->redirectToRoute('app_show_all_profiles', [
            ]);
        }

        $settings = $settingsRepository->findAll();
        return $this->render('app/edit_all_profiles.html.twig', [
            'settings' => $settings,
            'edited' => $setup->getId(),
            'change_name_form' => $formChangeProfileName
        ]);
    }

    #[Route('/app/remove_profile/{setup<\d+>}', name: 'app_remove_profile', priority: 5)]
    public function removeProfile(Request $request, Settings $setup, SettingsRepository $settingsRepository): Response
    {

        $settings = $settingsRepository->findAll();
        return $this->render('app/edit_all_profiles.html.twig', [
            'settings' => $settings,
            'edited' => $setup->getId(),
        ]);
    }
}