<?php

namespace App\Service\AlertsManager;

use App\Entity\Alerts;
use Doctrine\ORM\EntityManagerInterface;

class AlertsManager
{
    protected object $alerts;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->alerts = $entityManager->getRepository(Alerts::class);
    }

    public function getAlerts($object_id, $type, $page, $limit): array
    {
        $arr = array();
        $offset = $page * $limit;

        if ($type) {
            $arr['alerts'] = $this->alerts->findBy(
                [
                    'object' => $object_id,
                    'type' => $type
                ],
                ['id' => 'DESC'],
                $limit,
                $offset
            );
        } else {
            $arr['alerts'] = $this->alerts->findBy(
                [
                    'object' => $object_id,
                ],
                ['id' => 'DESC'],
                $limit,
                $offset
            );
        }

        $arr['numberOfAlerts'] = count($arr['alerts']);
        $arr['numberOfPages'] = $arr['numberOfAlerts'] / $limit;
        return $arr;
    }

    // update DATABASE by single array pair :: column_name -> value
    public function updateByArray(array $data, object $entity): int
    {
        return $this->alerts->update($entity, $data['name'], $data['value']);
    }
}