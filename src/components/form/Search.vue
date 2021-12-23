<template>
  <div class="search" :style="{ height:'280px'}">
		<slot name= "user"></slot>
    <form class="d-flex">
			<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
			<!-- <button class="btn btn-outline-success" @click='searchClick'>Search</button> -->
			<button class="btn btn-outline-success" type="button" @click='searchClick'>Search</button>
		</form>
  </div>
</template>
<script>
</script>