<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\User;
use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class OrderController extends AbstractController
{
    #[Route('/api/order/create', name: 'api_order_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, User $user): JsonResponse
    {
        $user = $this->getUser();

        if ($user === null) {
            return $this->json(['error' => 'Authentication requise'], JsonResponse::HTTP_UNAUTHORIZED);
        
        }

        $data = json_decode($request->getContent(), true) ?? [];

        $orderId = (int) ($data['orderId'] ?? 0);
        $orderNumber = (string) ($data['orderNumber'] ?? '');
        $total = (string) ($data['total'] ?? '');
        $status = (string) ($data['status'] ?? '');
        $createdAt = new \DateTimeImmutable();

        $missing = [];

        if ($orderId !== null) {
            $missing[] = 'orderId';
        }
        if ($orderNumber === '') {
            $missing[] = 'orderNumber';
        }
        if ($total !== null) {
            $missing[] = 'total';
        }
        if ($status === '') {
            $missing[] = 'status';
        }
        if ($createdAt !== null) {
            $missing[] = 'createdAt';
        }

        if ($missing) {
            return $this->json(['error' => 'Champs manquants: ' . implode(', ', $missing)], JsonResponse::HTTP_BAD_REQUEST);
        }

        $order = $entityManager->getRepository(Order::class)->find($orderId);

        if (!$order) {
            return $this->json(['error'=> 'Commande non trouvée'], JsonResponse::HTTP_NOT_FOUND);
        }

        $dateObj = \DateTime:: createFromFormat('Y-m-d', $createdAt) ?: null;
        $timeObj = \DateTime:: createFromFormat('H:i:s', $createdAt) ?: null;

        if (!$dateObj || !$timeObj) {
            return $this->json(['error' => 'Format de date ou d\'heure invalide'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $order->setOrderNumber($orderNumber);
        $order->setTotal($total);
        $order->setStatus($status);
        $order->setCreatedAt(new \DateTimeImmutable($createdAt));
        $order->setUser($user);
        $entityManager->flush();

        return $this->json(['message' => 'Commande mise à jour avec succès']);
    }
}