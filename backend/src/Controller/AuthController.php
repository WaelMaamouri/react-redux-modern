<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class AuthController 
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]

    public function register(
        Request $request,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $data = $request->toArray();

        $email = trim((string) ($data['email' ] ?? ''));
        $password = trim((string) ($data['password'] ?? ''));

        if ($email === '' || $password === '') {
            return new JsonResponse(['error' =>'Email et mot de passe sont requis'], Response::HTTP_BAD_REQUEST);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse(['error' =>'Addresse e-mail invalide'], Response::HTTP_BAD_REQUEST);
        }

        if (strlen($password) < 8) {
            return new JsonResponse(['error' =>'Le mot de passe doit contenir au moins 8 caractères'], Response::HTTP_BAD_REQUEST);
        }

        if ($userRepository->findOneBy(['email' => $email])) {
            return new JsonResponse(['error' =>'Cette adresse e-mail existe déjà'], Response::HTTP_CONFLICT);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($passwordHasher->hashPassword($user, $password));

        $entityManager->persist($user);

        $entityManager->flush();

        return new JsonResponse(['message' =>'Compte créé avec succès'], Response::HTTP_CREATED);

    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]

    public function login(Request $request): JsonResponse
    {
        return new JsonResponse(['message' => 'Connexion réussie'], Response::HTTP_OK);
    }
    
}