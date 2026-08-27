<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class AdminProductController extends AbstractController
{
    #[Route('/api/admin/products', name:'api_admin_products', methods: ['GET'])]

    public function products(ProductRepository $productRepository): JsonResponse
    {
        $product = $productRepository->findAll();

        $data = array_map(function (Product $product): array {
            return [
                'id'=> $product->getId(),
                'name'=> $product->getName(),
                'price'=> $product->getPrice(),
                'description'=> $product->getDescription(),
                'image'=> $product->getImage(),
                'category'=> $product->getCategory(),
                'promotion'=> $product->getPromotion(),
                'stock'=> $product->getStock()
            ];
        }, $product);

        return $this->json($data);
    }

    #[Route('/api/admin/products', name:'api_admin_product_create', methods: ['POST'])]

    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
   {
    $data = json_decode($request->getContent(), true);

    $validated = $this->validateProduct($data);

    if ($validated === null) {
        return $this->json(['error' => 'Données invalides'], JsonResponse::HTTP_BAD_REQUEST);
    }

    if ($validated instanceof JsonResponse) {
        return $validated;
    }

    $product = new Product();
    $product->setName($validated['name']);
    $product->setDescription($validated['description']);
    $product->setPrice($validated['price']);
    $product->setImage($validated['image']);
    $product->setCategory($validated['category']);
    $product->setPromotion($validated['promotion']);
    $product->setStock($validated['stock']);

    $entityManager->persist($product);
    $entityManager->flush();

    return $this->json([
        'message' => 'Produit créé avec succès',
        'product' => [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'image' => $product->getImage(),
            'category' => $product->getCategory(),
            'promotion' => $product->getPromotion(),
            'stock' => $product->getStock()
        ]

    ], JsonResponse::HTTP_CREATED);
   }

   private function validateProduct(array $data): array | JsonResponse 
   {
       $name = trim((string)($data['name'] ?? ''));       
       $description = trim((string)($data['description'] ?? ''));
       $image = trim((string)($data['image'] ?? ''));
       $category = trim((string)($data['category'] ?? ''));

        $price = $data['price'] ?? null;
        $promotion = $data['promotion'] ?? null;
        $stock = $data['stock'] ?? null;
     

       if ($name === '' || $description === '' || $image === '' || $category === '' || !is_numeric($price) || !is_numeric($promotion) || !is_numeric($stock)) {
           return new JsonResponse(['error' => 'Tous les champs sont requis'], JsonResponse::HTTP_BAD_REQUEST);
       }

       return [
           'name' => $name,
           'description' => $description,
           'price' => (float) $price,
           'image' => $image,
           'category' => $category,
           'promotion' => (float) $promotion,
           'stock' => (int) $stock
       ];
   }

   #[Route('/api/admin/products/{id}', name:'api_admin_product_update', methods: ['PUT'])]

   public function update(int $id, Request $request, ProductRepository $productRepository,
   EntityManagerInterface $entityManager): JsonResponse
   {
        $product = $productRepository->find($id);

        if (!product) {
            return new JsonResponse(['error' => 'Produit non trouvé'], JsonResponse::HTT¨_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $this->applyUpdates($product, $data);
        $entityManager->flush();

        return $this->json([
            'message' => 'Produit mis à jour avec succès',
            'product' => [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'image' => $product->getImage(),
                'category' => $product->getCategory(),
                'promotion' => $product->getPromotion(),
                'stock' => $product->getStock()
            ]
        ]);
   }
        private function applyUpdates(Product $product, array $data): void
        {
            if (isset($data['name'])) {
                $product->setName(trim((string) $data['name']));
            }
                        
            if (isset($data['name'])) {
                $product->setName(trim((string) $data['name']));
            }            
            if (isset($data['description'])) {
                $product->setDescription(trim((string) $data['description']));
            }            
            if (isset($data['category'])) {
                $product->setCategory(trim((string) $data['category']));
            }            
            if (isset($data['price'])) {
                $product->setPrice((float) $data['price']);
            }            
            if (isset($data['promotion'])) {
                $product->setPromotion((float) $data['promotion']);
            }
            if (isset($data['stock'])) {
                $product->setStock((int) $data['stock']);
            }

        }


    #[Route('/api/admin/products/{id}', name:'api_admin_product_delete', methods: ['DELETE'])]
    public function delete(int $id, ProductRepository $productRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $product = $productRepository->find($id);

        if (!$product) {
            return new JsonResponse(['error' => 'Produit non trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }

        $entityManager->remove($product);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Produit supprimé avec succès']);
    }
   }
