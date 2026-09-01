<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class AdminOrderController extends AbstractController
{
    #[Route('/api/admin/orders', name:'api_admin_orders', methods: ['GET'])]
    public function ordres(OrderRepository $orderRepository): JsonResponse
    {
        $order = $orderRepository->findAll();

        $data = array_map(function (Order $order): array {
            return [
                'id' => $order->getId(),
                'orderNumber' => $order->getOrderNumber(),
                'total' => $order->getTotal(),
                'status' => $order->getStatus(),
                'createdAt' => $order->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }, $order);

        return $this->json($data);
    }

    #[Route('/api/admin/{id}/status', name: 'api_admin_order_status', methods: ['PUT'])]

    public function updateStatus(int $id, Request $request, OrderRepository $orderRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $order = $orderRepository->find($id);

        if (!$order) {
            return $this->json(['message' => 'Order not found'], 404);
        }

        $data = json_decode((string) $request->getContent(), true);

        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            return $this->json(['message' => 'Invalid JSON data'], 400);
        }

        $status = $data['status'] ?? null;

        if ($status === null) {
            return $this->json(['message' => 'Status is required'], 400);
        };

        $allowedStatus = [
            Order::STATUS_PENDING,
            Order::STATUS_PROCESSING,
            Order::STATUS_COMPLETED,
            Order::STATUS_CANCELLED,
            Order::STATUS_FAILED,
            Order::STATUS_EXPIRED,
            Order::STATUS_PAID,
            Order::STATUS_PAID_PARTIALLY
        ];

        if (!in_array($status, $allowedStatus, true)) {
            return $this->json(['message' => 'Invalid status value'], 400);
        };

        $order->setStatus($status);

        $entityManager->flush();

        return $this->json(['message'=> 'success'],200);
    }

}