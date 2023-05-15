<?php

namespace App\Service\AlertsManager;

use App\Entity\Alerts;
use Doctrine\ORM\EntityManagerInterface;

class AlertsManager
{
    protected object $alerts;
    protected object $entity_manager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->alerts = $entityManager->getRepository(Alerts::class);
        $this->entity_manager = $entityManager;
    }

    public function getAlerts($object_id, $page, $limit): array
    {
        $arr = array();
        $alerts = $this->alerts->findBy(
            [
                'type' => 'sensor',
                'object' => $object_id
            ],
            ['id' => 'DESC'],
            $limit
        );





        return $alerts;
    }
}