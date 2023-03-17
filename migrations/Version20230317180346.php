<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230317180346 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE objects CHANGE humid humid LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\', CHANGE vent vent LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\', CHANGE shadow shadow LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE objects CHANGE humid humid VARCHAR(255) DEFAULT NULL, CHANGE vent vent VARCHAR(255) DEFAULT NULL, CHANGE shadow shadow VARCHAR(255) DEFAULT NULL');
    }
}
