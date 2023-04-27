<?php

namespace App\Repository;

use App\Entity\Alerts;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Alerts>
 *
 * @method Alerts|null find($id, $lockMode = null, $lockVersion = null)
 * @method Alerts|null findOneBy(array $criteria, array $orderBy = null)
 * @method Alerts[]    findAll()
 * @method Alerts[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AlertsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Alerts::class);
    }

    public function save(Alerts $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Alerts $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findActive(int $id): array
    {
        $qb = $this->createQueryBuilder('alerts')
            ->where('alerts.object = :id')
            ->andWhere('alerts.isActive = TRUE')
            ->orderBy('alerts.id', 'DESC')
            ->setParameter('id', $id);

        $query = $qb->getQuery();
        return $query->execute();
    }

    public function findActiveByType(int $id, string $type): array
    {
        $qb = $this->createQueryBuilder('alerts')
            ->where('alerts.object = :id')
            ->andWhere('alerts.isActive = TRUE')
            ->andWhere('alerts.type = :type')
            ->orderBy('alerts.id', 'DESC')
            ->setParameter('id', $id)
            ->setParameter('type', $type);

        $query = $qb->getQuery();
        return $query->execute();
    }


//    /**
//     * @return Alerts[] Returns an array of Alerts objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Alerts
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
