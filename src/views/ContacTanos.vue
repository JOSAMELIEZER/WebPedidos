<template>
    <div class="about">
      <!-- <h1>Su registro se modifico exitosamente</h1> -->
      <section class="py-5 text-center container">
  <div class="row py-lg-5">
    <div class="col-lg-6 col-md-8 mx-auto">
      <!-- {% with messages = get_flashed_messages() %}
      {% if messages %}
      {% for message in messages %} -->
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Hey!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>

      <!-- {% endfor%}
      {% endif %}
      {% endwith%} -->
      <h1 class="fw-light">Contactanos</h1>
    </div>
  </div>
</section>
<div class="container" style="padding-bottom: 80px;">
  <div class="row align-items-md-stretch">
    <div class="col-md-6">
      <div class="h-100 p-5 text-white bg-dark rounded-3">
        <h2>Contacta con nosotros</h2>
        <p>Te respondemos en breve</p>
        <li><i class="fa fa-phone fa-2x" style="padding: 10px; font-size: 25px;"></i>    +591 78600264</li>
        <li><i class="fa fa-envelope fa-2x" style="padding: 10px; font-size: 25px;"></i>    panaderianancy@gmail.com</li>
        <li><i class="fa fa-map-marker fa-2x" style="padding: 10px; font-size: 25px;"></i>    mercado “Roberto Yung” (zona Sudoeste Oruro)</li>
      </div>
      
    </div>
    <div class="col-md-6">
      <div class="h-100 p-5 bg-light border rounded-3">
        <h2>Dejanos un mensaje </h2>
        <form class="form-horizontal" action="" method="POST">
          <div  class="col-md-12">
            <div class="p-4"> 
              <div class="input-group mb-3">
                <input type="text" name="nombre" class="form-control" placeholder="Tu Nombre" required>
              </div>
              <div class="input-group mb-3">
                <input type="email" name="correo" class="form-control" placeholder="Tu Correo" required onkeyup="return forceLower(this)">
              </div>
              <div class="input-group mb-3">
                <input type="text " name="asunto" class="form-control" placeholder="Asunto" required>
              </div>
              <div class="input-group mb-3">
                <textarea name="mensaje" rows="4" class="form-control" placeholder="Mensaje" required></textarea>
              </div>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    </div>
</template>