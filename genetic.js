// const fs = require('fs');

const initial_population = 25;
const children_count = 10; // 20 in total
const gene_count = 3;
var initial_population_array = [];
let children_array = [];
let survival_of_fitness_array = [];
let x_range_max = 2;
let y_range_max = 3;
let z_range_max = 3;


const fitness_function_equation = (x, y, z) => {
    return (Math.pow(x, 2) - 2 * x * y * Math.pow(z, 2) + 2 * Math.pow(y, 2) * z - 5.7 * x * y * z + Math.pow(z, 2));
}

function random_number_for_x() {
    var random = (Math.random() * 4) - 2;
    return random;
}

function random_number_for_y() {
    var random = (Math.random() * 4) - 1;
    return random;
}

function random_number_for_z() {
    var random = (Math.random() * 3);
    return random;
}

function random_number_for_crossover() {
    var random = Math.round(Math.random() * 24);
    return random;
}

function random_number_for_mutation() {
    var random = Math.round(Math.random() * 1);
    return random;
}


function random_number_for_gene_mutation() {
    var random = Math.round(Math.random() * 2);
    return random;
}

const population = (initial_population_size) => { // calculate initial population
    let array = [];
    for (let i = 0; i < initial_population_size; i++) {
        array[i] = [];
        for (let j = 0; j < gene_count; j++) {
            switch (j) {
                case 0: //x
                    array[i][j] = random_number_for_x();
                    break;
                case 1: //y
                    array[i][j] = random_number_for_y();
                    break;
                case 2: //z
                    array[i][j] = random_number_for_z();
                    break;
            }
            
        }
    }
    return (array)
}

const check_similar_chromosome_genes = (chromosome1, chromosome2, array) => {
    if (array[chromosome1][0] === array[chromosome2][0] &&
        array[chromosome1][1] === array[chromosome2][1] &&
        array[chromosome1][2] === array[chromosome2][2]
    ) {
        return true;
    }
    return false;
}

const check_repeated_chromosome = (array, chromosome_added_value) => {
    return array.includes(chromosome_added_value);
}

const crossover = (array, children_population_count) => {
    let children_array = [];
    let chromosome_ledger = [];
    for (let i = 0; i < children_population_count; i++) {
        let chromosome1 = random_number_for_crossover();
        let chromosome2 = random_number_for_crossover();
        if (check_similar_chromosome_genes(chromosome1, chromosome2, array) || check_repeated_chromosome(chromosome_ledger, chromosome1 + "" + chromosome2)) {
            i--;
        }
        else {
            // Duplicate ledger maintaining
            chromosome_ledger.push(chromosome1 + "" + chromosome2);
            chromosome_ledger.push(chromosome2 + "" + chromosome1);

            children_array[i] = array[chromosome1];
            children_array[i + 10] = array[chromosome2];

            children_array[i][0] = children_array[i][0] + children_array[i + 10][0];
            children_array[i + 10][0] = children_array[i][0] - children_array[i + 10][0];
            children_array[i][0] = children_array[i][0] - children_array[i + 10][0];
            // array[chromosome1][0] = 
            // array[chromosome2][0] =
        }
    }
    return (children_array)
}

const mutation = (array) => {
    let mutate_arr = array;
    console.log(mutate_arr)
    for (let i = 0; i < mutate_arr.length; i++) {
        // if (random_number_for_mutation()) {
        if (1) {
            // let gene_value = random_number_for_gene_mutation();
            let gene_value = 2;
            // console.log(gene_value);
            switch (gene_value) {
                case 0:
                    if (mutate_arr[i][gene_value] + 1.03 > x_range_max) {
                        mutate_arr[i][gene_value] = mutate_arr[i][gene_value] - 1.03
                    } else {
                        mutate_arr[i][gene_value] = mutate_arr[i][gene_value] + 1.03
                    }
                    break;
                case 1:
                    if (mutate_arr[i][gene_value] + 1.03 > y_range_max) {
                        mutate_arr[i][gene_value] = mutate_arr[i][gene_value] - 1.03
                    } else {
                        mutate_arr[i][gene_value] = mutate_arr[i][gene_value] + 1.03
                    }
                    break;
                case 2:
                    if (mutate_arr[i][gene_value] + 2.03 > z_range_max) {
                        mutate_arr[i][gene_value] = mutate_arr[i][gene_value] - 1.03
                    } else {
                        mutate_arr[i][gene_value] = mutate_arr[i][gene_value] + 1.03
                    }
                    break;
            }
        }
        else {
        }
    }
    console.log(mutate_arr)
    return array;
}

const fitness_function_calculator = (array) => {
    for (let i = 0; i < array.length; i++) {
        array[i][3] = fitness_function_equation(array[i][0], array[i][1], array[i][2]) // array[i][3] is the value for fitness
    }
    return array;
}


initial_population_array = population(initial_population); // Initial Parent Selection

for (let i = 0; i < 3; i++) {
    // console.log(initial_population_array)
    children_array = crossover(initial_population_array, children_count); // Produce Children Array
    // console.log(children_array)
    children_array = mutation(children_array);
    // console.log(children_array);
    final_population = initial_population_array.concat(children_array)
    // console.log(final_population);
    final_population_with_fitness_value = fitness_function_calculator(final_population)
    final_population_with_fitness_value.sort((a, b) => {
        if (a[3] === b[3]) {
            return 0;
        }
        else {
            return (a[3] < b[3]) ? -1 : 1;
        }
    })

    // fs.writeFile('output'+i+'.txt', final_population_with_fitness_value, err => { // Write to the file
    //     console.log(err)
    // })
    // console.log(final_population_with_fitness_value)
    for (let i = 20; i < final_population_with_fitness_value.length; i++) { //select 25 survival of the fittest
        survival_of_fitness_array[i - 20] = final_population_with_fitness_value[i];
    }
    // console.log(survival_of_fitness_array)
    // survival_of_fitness_array
    // console.log(survival_of_fitness_array)
    initial_population_array = survival_of_fitness_array;
}