<?php

namespace App\Repository;

use App\Entity\Objects;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Objects>
 *
 * @method Objects|null find($id, $lockMode = null, $lockVersion = null)
 * @method Objects|null findOneBy(array $criteria, array $orderBy = null)
 * @method Objects[]    findAll()
 * @method Objects[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ObjectsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Objects::class);
    }

    public function save(Objects $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Objects $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function update(int $id, string $key, $value): int
    {
        $settings_id = $this->find($id)->getSettings()->getId();
        $qb = $this->createQueryBuilder('settings')
            ->update('App:Settings', 'p')
            ->set("p.$key", $value)
            ->where('p.id = :id')
            ->setParameter('id', $settings_id);

        $query = $qb->getQuery();
        return $query->execute();
    }

//    public function findID(): array
//    {
//        return $this->createQueryBuilder('item')
//            ->select('item.id')
//            ->orderBy('item.id', 'ASC')
//            ->getQuery()
//            ->getResult();
//    }

//    /**
//     * @return Objects[] Returns an array of Objects objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('o.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Objects
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
