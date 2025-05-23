import { Component } from '@angular/core';
import { Recipe, RecipeViewDetail } from '../../models/recipes';
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

  parametro?: number
  recetasEncontradas?: Recipe[]
  recipes: Recipe[]=[]
  imagenDefecto = "/defaultImage.jpg"

    selectedRecipe: RecipeViewDetail | null = null
    ingredienteList: string[] = []
    pasosList: string[] = []

    

  constructor(private route:ActivatedRoute, private etiquetaService:EtiquetaService, private recipeService:RecipeService){}

  ngOnInit(): void {
    // Obtener el idIngrediente de los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.parametro = params['id']; // parsear el param a numero(esta tipo any)
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
       /*  console.log('Etiquetas recibidas para posible receta por ID', response) */
      }, error:(error) => {
        console.log(`Error obtenido en recetaPosibleId, el idRecogido: ${idIngred}`, error);
      }
    })
  }

  viewDetail(recipe: Recipe){
   /*  console.log("lo que recibo de sugested", recipe); */
    
    this.recipeService.getRecipeById(recipe.id_receta).subscribe(
      (detailRecipe) =>{
        /* console.log("lo que recibo de detalle de receta sugerida", detailRecipe); */
        
        this.selectedRecipe = detailRecipe
        this.ingredienteList = this.parseIngredientes(detailRecipe.ingredientes_formato)
        this.pasosList = this.parsePaso(detailRecipe.receta_paso_paso)
      }, (error) => {
        console.log('Error al obtener detalle de la receta TIKITI', error);
        
      }
    )
  }

  parseIngredientes(ingredientes: string): string[]{
    return ingredientes
    .split(' , ')
    .map(item => item.replace(/[\[\]]/g, ''));
  }

  parsePaso(pasos: string): string[]{
    return pasos.split(/\s(?=\d+\.)/)
  }


}
