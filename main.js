

        // Declaro mis variables
        const listaProductos = document.getElementById("lista-productos");
        const totalidad = document.getElementById("total");
        const carrito = document.getElementById("carrito");
        const mostrarCarritoBtn = document.getElementById("mostrar-carrito-btn");
        const comprarBtn = document.getElementById("comprar-btn");

        const productos = [
            { nombre: "Producto 1", precio: 20 },
            { nombre: "Producto 2", precio: 50 },
            { nombre: "Producto 3", precio: 30 },
            { nombre: "Producto 4", precio: 100},
            // Agrega más productos según sea necesario
        ];

        let carrito_compras = [];
        let carritoVisible = false;

        // Función para mostrar los productos en la lista
        function mostrarProductos() {
            listaProductos.innerHTML = "";
            productos.forEach((producto, index) => {
                const li = document.createElement("li");
                li.innerHTML = `${producto.nombre} | Precio: $${producto.precio}`;
                const agregarAlCarritoBtn = document.createElement("button");
                agregarAlCarritoBtn.textContent = "Agregar al carrito";
                agregarAlCarritoBtn.addEventListener("click", () => agregarAlCarrito(producto));
                li.appendChild(agregarAlCarritoBtn);
                listaProductos.appendChild(li);
            });
        }

        // Función para agregar un producto al carrito de compras
        function agregarAlCarrito(producto) {
            carrito_compras.push(producto);
            mostrarCarrito();
            calcularTotal();
        }

        // Función para mostrar y/o ocultar el carrito
        function vistaCarrito() {
            carritoVisible = !carritoVisible;
            if (carritoVisible) {
                carrito.style.display = "block";
            } else {
                carrito.style.display = "none";
            }
        }

        // Función para mostrar los productos en el carrito
        function mostrarCarrito() {
            carrito.innerHTML = "";
            carrito_compras.forEach((producto, index) => {
                const li = document.createElement("li");
                li.innerHTML = `${producto.nombre} | Precio: $${producto.precio}`;
                const eliminarDelCarritoBtn = document.createElement("button");
                eliminarDelCarritoBtn.textContent = "Eliminar del carrito";
                eliminarDelCarritoBtn.addEventListener("click", () => eliminarDelCarrito(index));
                li.appendChild(eliminarDelCarritoBtn);
                carrito.appendChild(li);
            });
        }

        // Función para calcular el total del carrito
        function calcularTotal() {
            let total = 0;
            carrito_compras.forEach((producto) => {
                total += producto.precio;
            });
            totalidad.textContent = total;
        }


         // Función para eliminar un producto del carrito de compras
         function eliminarDelCarrito(index) {
            carrito_compras.splice(index, 1);
            mostrarCarrito();
            calcularTotal();
        }

        // Evento para mostrar/ocultar el carrito
        mostrarCarritoBtn.addEventListener("click", () => {
            vistaCarrito();
        });

        // Evento para comprar
        comprarBtn.addEventListener("click", () => {
            Swal.fire({
                title: "¿Desea confirmar la compra?",
                text: `Total: $${totalidad.textContent}`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Compra realizada. Muchas gracias por su visita!", '', "success");
                    carrito_compras = [];
                    mostrarCarrito();
                    calcularTotal();
                }
            });
        });

        // Llamo a mi función para inicializar mi página
        mostrarProductos();