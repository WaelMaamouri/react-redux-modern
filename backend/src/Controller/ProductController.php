<?php

namespace App\Controller;

use App\Repository\ProductRepository; 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ProductController extends AbstractController
{
    #[Route('/api/products', name: 'api_products', methods: ['GET'])]
    public function index(ProductRepository $productRepository): JsonResponse
    {
        $products = $productRepository->findAll();

        $data = array_map(static function($product): array {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'image' => $product->getImage(),
                'category' => $product->getCategory(),
                'promotion' => $product->getPromotion(),
                'stock' => $product->getStock(),
            ];
        }, $products);
    
        return new JsonResponse($data);

    }

    #[Route('/api/products/{id}', name:'api_product_show', methods: ['GET'])]

    public function show(int $id, ProductRepository $productRepository): JsonResponse
    {
        $product = $productRepository->find($id);

        if ($product === null) {
            return new JsonResponse(['error' => 'Produit non trouvé'], Response::HTTP_NOT_FOUND);
        }
            return $this->json( [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'image' => $product->getImage(),
                'category' => $product->getCategory(),
                'promotion' => $product->getPromotion(),
                'stock' => $product->getStock()
            ]);
        }
}