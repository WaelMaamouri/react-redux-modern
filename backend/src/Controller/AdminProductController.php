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
    if (!isset($data['name'])) {
        return $this->json(['message' => 'Missing name'], 400);
    }

        $name = trim((string)($data['name']));       

    if ($name === '') {
        return $this->json(['message' => 'Name cannot be empty'], 400);
    }
    
    if (!isset($data['description'])) {
        return $this->json(['message' => 'Missing description'], 400);
    }

       $description = trim((string)($data['description']));

    if ($description === '') {
        return $this->json(['message' => 'Description cannot be empty'], 400);
    }
    if (!isset($data['image'])) {
        return $this->json(['message' => 'Missing image'], 400);
    }
       $image = trim((string)($data['image']));
    
    if ($image === '') {
        return $this->json(['message' => 'Image cannot be empty'], 400);
    }


    if (!isset($data['category'])) {
        return $this->json(['message' => 'Missing category'], 400);
    }

       $category = trim((string)($data['category']));
    
    if ($category === '') {
        return $this->json(['message' => 'Category cannot be empty'], 400);
    }
    if (!isset($data['price'])) {
        return $this->json(['message' => 'Missing price'], 400);
    }
        $price = trim((string)($data['price']));

    if ($price === '' || !is_numeric($price)) {
        return $this->json(['message' => 'Invalid price format'], 400);
    }
        $price = (float) $price;
    if ($price < 0 ) {
        return$this->json(['message' => 'Price cannot be negative'], 400);
    }
    if (!isset($data['promotion'])) {
        return $this->json(['message' => 'Missing promotion'], 400);
    }
        $promotion = trim((string)($data['promotion']));

    if ($promotion === '' || !is_numeric($promotion)) {
        return $this->json(['message' => 'Invalid promotion format'], 400);
    }
        $promotion = (float) $promotion;
    
    if ($promotion < 0) {
        return $this->json(['message' => 'Promotion cannot be negative'], 400);
    }
    if (!isset($data['stock'])) {
        return $this->json(['message' => 'Missing stock'], 400);
    }

    $stock = trim((string)($data['stock']));
    if ($stock === '' || !is_numeric($stock)) {
        return $this->json(['message' => 'Invalid stock format'], 400);
    }
    $stock = (int) $stock;
    if ($stock < 0) {
        return $this->json(['message' => 'Stock cannot be negative'], 400);
    }     

       return [
           'name' => $name,
           'description' => $description,
           'price' => $price,
           'image' => $image,
           'category' => $category,
           'promotion' => $promotion,
           'stock' => $stock
       ];
   }

   #[Route('/api/admin/products/{id}', name:'api_admin_product_update', methods: ['PUT'])]

   public function update(int $id, Request $request, ProductRepository $productRepository,
   EntityManagerInterface $entityManager): JsonResponse
   {
        $product = $productRepository->find($id);

        if (!$product) {
            return new JsonResponse(['error' => 'Produit non trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            return new JsonResponse(['error' => 'Données JSON invalides'], JsonResponse::HTTP_BAD_REQUEST);
        }

        if (empty($data)) {
            return new JsonResponse(['error' => 'Aucune donnée fournie pour la mise à jour'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $validatedData = $this->validateProductUpdate($data);

        if ($validatedData instanceof JsonResponse) {
            return $validatedData;
        }

        $this->applyUpdates($product, $validatedData);
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
        
        private function validateProductUpdate(array $data): array|JsonResponse
        {
            $validateData = [];

            if (isset($data['name'])) {
                $name = trim((string) $data['name']);

                if ($name === '') {
                    return new JsonResponse(['error' => 'Le nom du produit ne peut pas être vide'], JsonResponse::HTTP_BAD_REQUEST);
                }
                $validateData['name'] = $name;
            }
            if (isset($data['description'])) {
                $description = trim((string) $data['description']);

                if ($description === '') {
                    return new JsonResponse(['error' => 'La description du produit ne peut pas être vide'], JsonResponse::HTTP_BAD_REQUEST);
                }
                $validateData['description'] = $description;
            }
            if (isset($data['category'])) {
                $category = trim((string) $data['category']);

                if ($category === '') {
                    return new JsonResponse(['error' => 'La catégorie du produit ne peut pas être vide'], JsonResponse::HTTP_BAD_REQUEST);
                }
                $validateData['category'] = $category;
            }
            if (isset($data['price'])) {
                $price = trim((string) $data['price']);
                if ($price === '' || !is_numeric($price)) {
                    return new JsonResponse(['error' => 'Le prix du produit ne peut pas être vide'], JsonResponse::HTTP_BAD_REQUEST);
                }

                $price = (float) $price;

                if ($price < 0) {
                    return new JsonResponse(['error' => 'Le prix du produit ne peut pas être négatif'], JsonResponse::HTTP_BAD_REQUEST);
                }

                $validateData['price'] = $price;
            }

            if (isset($data['image'])) {
                $image = trim((string) $data['image']);

                if ($image === '') {
                    return new JsonResponse(['error' => 'L\'image du produit ne peut pas être vide'], JsonResponse::HTTP_BAD_REQUEST);
                }

                $validateData['image'] = $image;
            }
            if (isset($data['promotion'])) {
                $promotion = trim((string) $data['promotion']);

                if ($promotion === '' || !is_numeric($promotion)) {
                    return new JsonResponse(['error' => 'La promotion du produit ne peut pas être vide'], JsonResponse::HTTP_BAD_REQUEST);
                }

                $validateData['promotion'] = (float) $promotion;
            
                if ($promotion < 0) {
                    return new JsonResponse(['error' => 'La promotion du produit ne peut pas être négative'], JsonResponse::HTTP_BAD_REQUEST);
                }
            
            }
            if (isset($data['stock'])) {
                $stock = trim((string) $data['stock']);

                if ($stock === '' || !is_numeric($stock)) {
                    return new JsonResponse(['error' => 'Le stock du produit ne peut pas être vide'], JsonResponse::HTTP_BAD_REQUEST);
                }
                $stock = (int) $stock;

                if ($stock < 0) {
                    return new JsonResponse(['error' => 'Le stock du produit ne peut pas être négatif'], JsonResponse::HTTP_BAD_REQUEST);
                }
                $validateData['stock'] = (int) $stock;
            
            }

            return $validateData;
    
        }
        private function applyUpdates(Product $product, array $data): void
        {
            if (isset($data['name'])) {
                $product->setName($data['name']);
            }
        
            if (isset($data['description'])) {
                $product->setDescription($data['description']);
            }            
            if (isset($data['category'])) {
                $product->setCategory($data['category']);
            }            
            if (isset($data['price'])) {
                $product->setPrice((float) $data['price']);
            }            
            if (isset($data['image'])) {
                $product->setImage($data['image']);
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
