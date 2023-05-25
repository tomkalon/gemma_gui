<?php

namespace App\Command;

use App\Repository\UserRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ChoiceQuestion;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:user_role',
    description: 'Przypisanie roli Administratora',
)]
class UserRoleCommand extends Command
{
    public function __construct(private readonly UserRepository $userRepository)
    {
        parent::__construct();
    }
    protected function configure(): void
    {
        $this
            ->setHelp('Polecenie pomoże Ci przypisać role administratora do konkretnego użytkownika.')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $helper = $this->getHelper('question');
        $userList = $this->userRepository->findAllAttr('email');
        $arr = array();
        foreach ($userList as $key => $element) {
            $arr[$key] = $element['email'];
        }

        $addChoice = new ConfirmationQuestion(
            'Czy chcesz przypisać do konta rolę administratora? (y/n)',
            false,
            '/^(y)/i'
        );

        if ($helper->ask($input, $output, $addChoice)) {

            $question = new ChoiceQuestion(
                'Wskaż email konta, do którego przypisać uprawnienia administratora!',
                $arr,
                '...'
            );

            $selected_user = $helper->ask($input, $output, $question);
            $user = $this->userRepository->findOneBy([
                'email' => $selected_user
            ]);

            $user->setRoles(['ROLE_ADMIN']);
            $this->userRepository->save($user, true);
            $io = new SymfonyStyle($input, $output);
            $io->success(sprintf('Rola została dodana do konta o adresie email: %s', $selected_user ));

        } else {
            $io = new SymfonyStyle($input, $output);
            $io->success('Brak akcji do wykonania');
        }

        $removeChoice = new ConfirmationQuestion(
            'Czy chcesz usunąć z konta rolę administratora? (y/n)',
            false,
            '/^(y)/i'
        );

        if ($helper->ask($input, $output, $removeChoice)) {
            $question = new ChoiceQuestion(
                'Wskaż email konta, z którego usunąć uprawnienia administratora!',
                $arr,
                '...'
            );

            $selected_user = $helper->ask($input, $output, $question);
            $user = $this->userRepository->findOneBy([
                'email' => $selected_user
            ]);

            $user->setRoles(['']);
            $this->userRepository->save($user, true);
            $io = new SymfonyStyle($input, $output);
            $io->success(sprintf('Rola administratora została usunięta z konta o adresie email: %s', $selected_user ));
        }
;
        return Command::SUCCESS;

    }
}
