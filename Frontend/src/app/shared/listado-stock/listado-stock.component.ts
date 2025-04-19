import { Component, OnInit } from '@angular/core';
import { Stockage, StockageView } from '../../models/stockageView';
import { StockageService } from '../../services/stockage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-stock',
  standalone: false,
  templateUrl: './listado-stock.component.html',
  styleUrls: ['./listado-stock.component.css'],
})
export class ListadoStockComponent implements OnInit {
  allItems: StockageView[] = [];
  stockItems: StockageView[] = [];
  selectedIngredientId: number | null = null;
  selectedIngredientName: string = '';
  mostrarModal = false;
  modalTitle = '';
  isFormVisible = false;
  selectedCategory: string = '';
  searchTerm: string = '';



  // Modelo del formulario (valores undefined para mostrar placeholders)
  formModel: Stockage = {
    id_ingrediente: 0,
    cantidad_almacen: undefined,
    cantidad_nevera: undefined,
    cantidad_congelador: undefined
  };

  constructor(private stockageService: StockageService) {}

  ngOnInit() {
    this.stockageService.getAllStockages().subscribe(items => {
      this.allItems = items;
      this.stockItems = [...items];  // al principio muestro todo
    });
  }

  getStockItems(): void {
    this.stockageService.getAllStockages().subscribe(
      (data) => (this.stockItems = data),
      (error) => console.error('Error obteniendo stock', error)
    );
  }
 
  
  filterByCategory() {
    if (!this.selectedCategory) {
      // si es cadena vacía (o “Todas”), volver a mostrar todo
      this.stockItems = [...this.allItems];
    } else {
      this.stockItems = this.allItems.filter(
        item => item.categoria === this.selectedCategory
      );
    }
  }

  buscarStockage() {
    if (this.searchTerm.trim() !== '') {
      this.stockageService.buscarStockage(this.searchTerm).subscribe({
        next: (result) => {
          this.stockItems = result;
        },
        error: (error) => {
          console.error('Error al buscar:', error);
          this.stockItems = [];
        }
      });
    } else {
      
      this.stockItems = [...this.allItems];
    }
  }




  openEditForm(item: StockageView): void {

    console.log('Item recibido:', item); 
    this.selectedIngredientId = item.id_ingrediente;
    this.selectedIngredientName = item.ingrediente;
    this.modalTitle = 'Actualizar Cantidades';
    
    // Inicializa con undefined para mostrar placeholders
    this.formModel = {
      id_ingrediente: item.id_ingrediente,
      cantidad_almacen: undefined,
      cantidad_nevera: undefined,
      cantidad_congelador: undefined
    };

      // Debug: Verifica el ID asignado
  console.log('ID asignado:', this.formModel.id_ingrediente); 
    this.mostrarModal = true;
  }

  closeModal(): void {
    this.mostrarModal = false;
  }

  onSubmitForm(): void {
    // Convertir undefined a 0
    const cantidad_almacen = this.formModel.cantidad_almacen || 0;
    const cantidad_nevera = this.formModel.cantidad_nevera || 0;
    const cantidad_congelador = this.formModel.cantidad_congelador || 0;
  
    // Validación frontend
    if (cantidad_almacen + cantidad_nevera + cantidad_congelador <= 0) {
      alert('Debes ingresar al menos una cantidad mayor que 0');
      return;
    }
  
    // Validar que el ID sea válido
    if (this.selectedIngredientId == null) {
      alert('Error: No se ha seleccionado un ingrediente válido.');
      return;
    }
  
    // Mostrar ID en consola
    console.log('ID a actualizar:', this.selectedIngredientId);
  

    
    const updateData = {
      cantidad_almacen: cantidad_almacen,
      cantidad_nevera: cantidad_nevera,
      cantidad_congelador: cantidad_congelador
    };
  
    // Llamar al servicio usando selectedIngredientId
    
    this.stockageService.updateStockage(this.selectedIngredientId!, updateData).subscribe({
      next: () => {
        console.log('Actualización exitosa');
        this.getStockItems(); // Actualizar lista
        this.closeModal();
      },
      error: (err) => {
        console.error('Error en actualización:', err);
        alert('Error al actualizar el stock');
      }
    });
  }

  deleteIngredient(idIngrediente: number): void {
    console.log('Ingrediente a eliminar:', idIngrediente); 
  
    Swal.fire({
      title: "¿Estás seguro de eliminar este ingrediente?",
      text: "Esta acción no se puede deshacer",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: `No, mantener`,
      confirmButtonColor: '#000000B3',
      cancelButtonColor: '#888888B3',
  
      didOpen: () => {
        const addHoverEffects = (button: HTMLElement, originalColor: string) => {
          button.style.transition = '0.15s ease-in-out';
  
          button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = 'rgba(237, 117, 87, 0.645)';
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
          });
          button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = "#000000B3";
            button.style.boxShadow = 'none';
          });
        };
  
        const confirmBtn = Swal.getConfirmButton();
        if (confirmBtn) {
          confirmBtn.style.borderRadius = '10px';
          addHoverEffects(confirmBtn, '#3085d6');
        }
  
        const cancelBtn = Swal.getCancelButton();
        if (cancelBtn) {
          cancelBtn.style.borderRadius = '10px';
          addHoverEffects(cancelBtn, '#3085d6');
        }
      }
  
    }).then((result) => {
      if (result.isConfirmed) {
        this.stockageService.deleteIngredientById(idIngrediente).subscribe({
          next: (response) => {
            console.log("Ingrediente eliminado:", response);
            Swal.fire("Ingrediente eliminado con éxito", "", "success");
            
            this.getStockItems(); 
          },
          error: (error) => {
            console.error("Error al eliminar ingrediente", error);
            Swal.fire("Error", "No se pudo eliminar el ingrediente", "error");
          }
        });
      } else if (result.isDismissed) {
        Swal.fire("El ingrediente no ha sido eliminado", "", "info");
      }
    });
  }
  


  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}

