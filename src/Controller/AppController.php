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
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
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

        $alerts = $alertsManager->getAlerts($object, 0, 0, 10);
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
        $form = $this->createForm(ChangeSettingsProfileType::class, $object);
        $form->handleRequest($request);

        // form handling
        if ($form->isSubmitted() && $form->isValid()) {
            $object = $form->getData();

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
            'select_profile_form' => $form
        ]);
    }

    #[Route('/app/show_all_profiles', name: 'app_show_all_profiles', priority: 5)]
    public function showAllProfiles(Request $request, SettingsRepository $settingsRepository): Response
    {
        $settings = new Settings();
        $form = $this->createForm(ChangeSettingsProfileNameType::class, $settings);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $settings = $form->getData();

            // update data
            $settingsRepository->save($settings, true);

            // flash message
            $this->addFlash('success', 'Profil został dodany!');

            // redirection
            return $this->redirectToRoute('app_show_all_profiles', [
            ]);
        }

        $settingsAll = $settingsRepository->findAll();
        return $this->render('app/edit_all_profiles.html.twig', [
            'all' => true,
            'settings' => $settingsAll,
            'new_profile_form' => $form
        ]);
    }


    #[Route('/app/edit_profile_name/{setup<\d+>}', name: 'app_edit_profile_name', priority: 5)]
    public function editProfileName(Request $request, Settings $setup, SettingsRepository $settingsRepository): Response
    {
        $form = $this->createForm(ChangeSettingsProfileNameType::class, $setup);
        $form->handleRequest($request);

        // form handling
        if ($form->isSubmitted() && $form->isValid()) {
            $setup = $form->getData();

            // update data
            $settingsRepository->save($setup, true);

            // flash message
            $this->addFlash('success', 'Dane zostały zmienione!');

            // redirection
            return $this->redirectToRoute('app_show_all_profiles', [
            ]);
        }

        $settings = $settingsRepository->findAll();
        return $this->render('app/edit_all_profiles.html.twig', [
            'settings' => $settings,
            'edited' => $setup->getId(),
            'change_name_form' => $form
        ]);
    }

    #[Route('/app/remove_profile/{setup<\d+>}', name: 'app_remove_profile', priority: 5)]
    public function removeProfile(Request $request, Settings $setup, SettingsRepository $settingsRepository): Response
    {
        $form = $this->createFormBuilder($setup)
            ->add('remove', SubmitType::class)
            ->getForm();
        $form->handleRequest($request);

        $settings = new Settings();
        $new_profile_form = $this->createForm(ChangeSettingsProfileNameType::class, $settings);
        $new_profile_form->handleRequest($request);

        // form handling
        if ($form->isSubmitted() && $form->isValid()) {
            $setup = $form->getData();

            // update data
            $settingsRepository->remove($setup, true);

            // flash message
            $this->addFlash('success', 'Profil został usunięty!');

            // redirection
            return $this->redirectToRoute('app_show_all_profiles', [
            ]);
        }

        if ($new_profile_form->isSubmitted() && $new_profile_form->isValid()) {
            $settings = $new_profile_form->getData();

            // update data
            $settingsRepository->save($settings, true);

            // flash message
            $this->addFlash('success', 'Profil został dodany!');

            // redirection
            return $this->redirectToRoute('app_show_all_profiles', [
            ]);
        }

        $settings = $settingsRepository->findAll();
        return $this->render('app/edit_all_profiles.html.twig', [
            'all' => true,
            'settings' => $settings,
            'remove_id' => $setup->getId(),
            'remove_profile_form' => $form,
            'new_profile_form' => $new_profile_form
        ]);
    }
}