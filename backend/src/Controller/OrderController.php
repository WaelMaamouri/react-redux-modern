<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class OrderController extends AbstractController
{
    #[Route(path: '/api/orders', name: 'api_order_list', methods: ['GET'])]

    public function index(OrderRepository $orderRepository): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['message' => 'User not authenticated'], 401);
        }
        $orders = $orderRepository->findByUser($user->getId());

       $orders = array_map(function (Order $order) {
                return [
                    'id' => $order->getId(),
                    'orderNumber' => $order->getOrderNumber(),
                    'total' => $order->getTotal(),
                    'status' => $order->getStatus(),
                    'createdAt' => $order->getCreatedAt()->format('Y-m-d H:i:s'),
                ];
            }, $orders) ?: [];

        return $this->json(['orders' => $orders]);
      
    }
    #[Route('/api/order/create', name: 'api_order_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode((string) $request->getContent(), true);

        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            return $this->json(['message' => 'Invalid JSON data'], 400);
        }
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['message' => 'User not authenticated'], 401);
        }

        $validated = $this->validateOrderData($data);

        if ($validated instanceof JsonResponse) {
            return $validated;
        }

        $order = new Order();
        $order->setOrderNumber($validated['orderNumber']);
        $order->setTotal($validated['total']);
        $order->setStatus($validated['status']);
        $order->setCreatedAt(new \DateTimeImmutable($validated['createdAt']));
        $order->setUser($user);   


        $entityManager->persist($order);
        $entityManager->flush();

        return $this->json([
            'message' => 'Order created successfully',
            'order' => [
                'id'=> $order->getId(),
                'orderNumber' => $order->getOrderNumber(),
                'total' => $order->getTotal(),
                'status' => $order->getStatus(),
                'createdAt' => $order->getCreatedAt()->format('Y-m-d H:i:s')
                ],
            ], 201);
    }

    private function validateOrderData(array $data): array|JsonResponse
    {
    if (!isset($data['orderNumber'])) {
        return $this->json(['message' => 'Missing orderNumber'], 400);
    } 

    $orderNumber = trim((string) $data['orderNumber'] ?? '');

    if ($orderNumber === '') {
        return $this->json(['message' => 'Invalid orderNumber'], 400);
    }

    if (!isset($data['total'])) {
        return $this->json(['message' => 'Missing total'], 400);
    }

    $total = trim((string) $data['total'] ?? '');
   
    if ($total === '' || !is_numeric($total)) {
        return $this->json(['message' => 'Invalid total format'], 400);
    }
    
    $total = (float) $total;

    if ($total < 0) {
        return $this->json(['message' => 'Total must be a non-negative number'], 400);
    }

    if (!isset($data['status'])){
        return $this->json(['message' => 'Missing status'], 400);
    }

    $status = trim((string) $data['status'] ?? '');

        if (
            $status !== 'pending' &&
            $status !== 'processing' &&
            $status !== 'completed' &&
            $status !== 'cancelled'
            )
            {
               return $this->json(['message' => 'Invalid status value'], 400);
            }

    if (!isset($data['createdAt'])) {
        return $this->json(['message' => 'Missing createdAt'], 400);
    }

    $createdAt = trim((string) $data['createdAt'] ?? '');

    if ($createdAt === '') {
        return $this->json(['message' => 'Invalid createdAt'], 400);
    }

    try {
        new \DateTimeImmutable($createdAt);
    } catch (\Exception $e) {
        return $this->json(['message' => 'Invalid createdAt format'], 400);
    }

    return [
        'orderNumber' => $orderNumber,
        'total' => $total,
        'status' => $status,
        'createdAt' => $createdAt,
    ];
    }

    #[Route('/api/order/edit/{id}', name:'api_order_edit', methods: ['PUT'])]
    public function edit(int $id,Request $request, EntityManagerInterface $entityManager, OrderRepository $orderRepository): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['message' => 'User not authenticated'], 401);
        }

        $order = $orderRepository->find($id);

        if (!$order) {
            return $this->json(['message' => 'Order not found' . $id], 404);
        }

        if ($order->getUser() !== $user) {
            return $this->json(['message' => 'You are not authorized to edit this order'], 403);
        }

        $data =json_decode((string) $request->getContent(), true);

        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            return $this->json(['message' => 'Invalid JSON data'], 400);
        }

        $validatedData = $this->validateOrderEditData($data);

        if ($validatedData instanceof JsonResponse) {
            return $validatedData;
        }

        $this->applyOrderEdits($order, $validatedData);
        $entityManager->flush();

        return $this->json([
            'message' => 'Order updated successfully',
            'order' => [
                'id' => $order->getId(),
                'orderNumber' => $order->getOrderNumber(),
                'total' => $order->getTotal(),
                'status' => $order->getStatus(),
                'createdAt' => $order->getCreatedAt()->format('Y-m-d H:i:s'),
            ],
        ], 200);
    }

        private function validateOrderEditData(array $data): array|JsonResponse
        {

            $validatedData = [];

            if (isset($data['orderNumber'])) {
                $orderNumber = trim((string) $data['orderNumber']);

                if ($orderNumber === '') {
                    return $this->json(['message' => 'Invalid orderNumber format'], 400);
                }

                $validatedData['orderNumber'] = $orderNumber;
            }

            if (isset($data['total'])) {
                $total = trim((string) $data['total']);

                if ($total === '' || !is_numeric($total)) {
                    return $this->json(['message' => 'Invalid total format'], 400);
                }

                $total = (float) $total;

                if ($total < 0) {
                    return $this->json(['message' => 'Total must be a non-negative number'], 400);
                }

                $validatedData['total'] = $total;
            }

            if (isset($data['status'])) {
                $status = trim((string) $data['status']);
                if ($status === '') {
                    return $this->json(['message' => 'Invalid status format'], 400);
                }
                if (
                    $status !== 'pending' &&
                    $status !== 'processing' &&
                    $status !== 'completed' &&
                    $status !== 'cancelled'
                    ) {
                        return $this->json(['message' => 'Invalid status value'], 400);
                    }

                $validatedData['status'] = $status;
            }

            if (isset($data['createdAt'])) {
                $createdAt = trim((string) $data['createdAt']);

                if ($createdAt === '') {
                    return $this->json(['message' => 'Invalid createdAt format'], 400);
                }

                try {
                    new \DateTimeImmutable($createdAt);
                } catch (\Exception $e) {
                    return $this->json(['message' => 'Invalid createdAt format'], 400);
                }

                $validatedData['createdAt'] = $createdAt;
            }

            return $validatedData;
        }

        private function applyOrderEdits(Order $order, array $data): void
        {
            if (isset($data['orderNumber'])) {
                $order->setOrderNumber($data['orderNumber']);
            }

            if (isset($data['total'])) {
                $order->setTotal($data['total']);
            }

            if (isset($data['status'])) {
                $order->setStatus($data['status']);
            }

            if (isset($data['createdAt'])) {
                $order->setCreatedAt(new \DateTimeImmutable($data['createdAt']));
            }
            
        }

        #[Route (path:'/api/order/delete/{id}', name:'api_order_delete', methods:['DELETE'])]
        public function delete(int $id, OrderRepository $orderRepository, EntityManagerInterface $entityManagerInterface): JsonResponse
        {
            $order = $orderRepository->find($id);

            if (!$order) {
                return $this->json(['message' => 'Order not found'], 404);
            }

            $user = $this->getUser();

            if (!$user) {
                return $this->json(['message' => 'User not authenticated'], 401);
            }

            if ($order->getUser() !== $user) {
                return $this->json(['message' => 'You are not authorized to edit this order'], 403);
            }

            $entityManagerInterface->remove($order);
            $entityManagerInterface->flush();

            return $this->json(['message' => 'Order deleted successfully'], 200);
        }
    }

