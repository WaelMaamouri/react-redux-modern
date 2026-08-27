<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $product = [
        [
            'category' => 'Smartphone',
            'name' => 'iPhone 17 Pro Max',
            'description' => 'Le dernier smartphone d\'Apple avec des fonctionnalités avancées et un
    design élégant.',
            'price' => 1499.99,
            'image' => '/images/iphone17promax.jpg',
            'promotion' => 0.15,
            'stock' => 50,

        ],

        [
            'category' => 'Ordinateur portable',
            'name' => 'MacBook Pro 16"',
            'description' => 'Un ordinateur portable puissant pour les professionnels de la création.',
            'price' => 2499.99,
            'image' => '/images/macbookpro16.jpg',
            'promotion' => 0.10,
            'stock' => 30,
        ],

        [
            'category' => 'Tablette',
            'name' => 'iPad Air',
            'description' => 'Une tablette légère et performante pour le travail et le divertissement.',
            'price' => 599.99,
            'image' => '/images/ipadair.jpg',
            'promotion' => 0.05,
            'stock' => 100,
        ],

        [
            'category' => 'Accessoires',
            'name' => 'AirPods Pro',
            'description' => 'Des écouteurs sans fil avec réduction de bruit active et qualité sonore
    exceptionnelle.',
            'price' => 249.99,
            'image' => '/images/airpodspro.jpg',
            'promotion' => 0.20,
            'stock' => 200,
        ]
        ];
        foreach ($product as $data) {
            $product = new Product();
            $product->setCategory($data['category']);
            $product->setName($data['name']);
            $product->setDescription($data['description']);
            $product->setPrice($data['price']);
            $product->setImage($data['image']);
            $product->setPromotion($data['promotion']);
            $product->setStock($data['stock']);

            $manager->persist($product);
        }

        $manager->flush();
    }
}
