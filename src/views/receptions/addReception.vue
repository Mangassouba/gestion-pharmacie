<template>
    <div class="container mt-4">
      <h2>Ajouter une Réception</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Reception Info Section -->
        <div class="mb-3">
          <label for="receptionDate" class="form-label">Date de Réception</label>
          <input
            type="date"
            id="receptionDate"
            v-model="reception_date"
            class="form-control"
            required
          />
        </div>
  
        <!-- Reception Details Section -->
        <div>
          <h3>Détails de la Réception</h3>
          <div v-for="(detail, index) in receptionDetails" :key="index" class="mb-3">
            <div class="row align-items-end">
              <div class="col-md-5">
                <label class="form-label">Produit</label>
                <select
                  v-model="detail.productId"
                  class="form-control"
                  required
                >
                  <option disabled value="">Sélectionner un produit</option>
                  <option v-for="product in products" :key="product.id" :value="product.id">
                    {{ product.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-2">
                <label class="form-label">Quantité</label>
                <input
                  type="number"
                  v-model="detail.quantity"
                  class="form-control"
                  required
                />
              </div>
              <div class="col-md-2">
                <label class="form-label">Prix</label>
                <input
                  type="number"
                  v-model="detail.price"
                  class="form-control"
                  required
                />
              </div>
              <div class="col-md-2">
                <button
                  type="button"
                  @click="removeDetail(index)"
                  class="btn btn-danger"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
          <button type="button" @click="addDetail" class="btn btn-primary mt-3">
            Ajouter un autre produit
          </button>
        </div>
  
        <!-- Submit Button -->
        <button type="submit" class="btn btn-success mt-4">Enregistrer la Réception</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useReceptionStore } from '../../stores/receptionStore';
  import { useProductStore } from '../../stores/productStore';
  import moment from 'moment';
  
  const receptionStore = useReceptionStore();
  const productStore = useProductStore();
  
  const reception_date = ref('');
  const receptionDetails = ref([{ productId: '', quantity: 1, price: 0 }]);
  const products = ref([]);
  
  // Fetch products when the component mounts
  onMounted(async () => {
    try {
      await productStore.fetchProducts();
      products.value = productStore.products;
    } catch (error) {
      console.error("Échec du chargement des produits :", error.message);
    }
  });
  
  // Ajouter une ligne de détails de réception
  const addDetail = () => {
    receptionDetails.value.push({ productId: '', quantity: 1, price: 0 });
  };
  
  // Supprimer une ligne de détails de réception
  const removeDetail = (index) => {
    receptionDetails.value.splice(index, 1);
  };
  
  // Soumettre la réception
  const handleSubmit = async () => {
    const newReception = {
      reception_date: moment(reception_date.value).toISOString(),
      details: JSON.parse(JSON.stringify(receptionDetails.value))
    };
    await receptionStore.addreception(newReception);
  };
  </script>
  
  <style scoped>
  /* Optional styling */
  </style>
  