import { Component } from '@angular/core';
import { Recipe } from '../../models/recipes';
import { ActivatedRoute } from '@angular/router';
import { EtiquetaService } from './../../services/etiqueta.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-suggested-recipes',
  standalone: false,
  templateUrl: './suggested-recipes.component.html',
  styleUrl: './suggested-recipes.component.css'
})
export class SuggestedRecipesComponent {

  parametro?: any 
  recetasEncontradas?: Recipe[]
  recipes?: Recipe[]

  constructor(private route:ActivatedRoute, private etiquetaService:EtiquetaService, private recipeService:RecipeService){}

  ngOnInit(): void {
    // Obtener el idIngrediente de los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.parametro = +params['id']; // parsear el param a numero(esta tipo any)
      if (this.parametro) {
        this.getRecetasPosibleIdIng(this.parametro);
      }
    });
  }

  getRecetasPosibleIdIng(idIngred:number) {
    //this.caducidadesList = []
    this.recipeService.getRecipeByIdIngrediente(idIngred).subscribe({
      next: (response)=>{
        this.recipes= response
        console.log('Etiquetas recibidas para posible receta por ID', response)
      }, error:(error) => {
        console.log(`Error obtenido en recetaPosibleId, el idRecogido: ${idIngred}`, error);
      }
    })
  }

}
