// Representative of distribution in English language
// TODO: Tidy this up
CHARS = "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNSSSSSSSSSSSSSSSSSSSSSSSSSSSSSLLLLLLLLLLLLLLLLLLLLLLLLLLLLCCCCCCCCCCCCCCCCCCCCCCCUUUUUUUUUUUUUUUUUUUDDDDDDDDDDDDDDDDDPPPPPPPPPPPPPPPPMMMMMMMMMMMMMMMHHHHHHHHHHHHHHHGGGGGGGGGGGGGBBBBBBBBBBBFFFFFFFFFYYYYYYYYYWWWWWWWKKKKKKVVVVVXXZZJJQQ"
// Number of chars to play with
SELECTION_COUNT = 8
// The chars which the user can use to input a word
INPUT_CHARS = []
// Selection
SELECTION = []
// Character that gets displayed when no char is selected
DEFAULT_SELECTION_CHAR = '_'
// List of words found by the user
FOUND_WORDS = []
// Minimum acceptable word length
MIN_WORD_LENGTH = 2

function get_random_char(){
    // Get a random char from the CHARS distribution
    return CHARS[Math.floor(Math.random() * CHARS.length)]
}

class Letter{
    constructor(index){
        this.index = index
        this.char = get_random_char()
        this.el = document.getElementById('letter-btn-' + index)
        this.selected = false

        this.render_char()
    }

    render_char(){
        this.el.innerText = this.char
    }

    select(){
        this.selected = true
        this.el.classList.add('letter-btn-selected')
    }

    deselect(){
        this.selected = false
        this.el.classList.remove('letter-btn-selected')
    }
}

function is_word(word){
    // Determine if the word is in the wordlist
    return WORDLIST.includes(word.toLowerCase())
}

function generate_game_data(num_chars){
    // Generate a list of chars for game and set game data
    chars = []
    for(i = 0; i < num_chars; i++) chars.push(new Letter(i))
    return chars
}

// Render functions
function get_letter_el(letter){
    return `<div class="letter output-letter">${letter}</div>`
}

function get_letter_container_el(letters){
    letter_els = ''
    letters.forEach(letter => {letter_els += get_letter_el(letter)})
    return `<div class="letter-container">${letter_els}</div>`
}

function render_word_output(letters){
    letter_container_el = get_letter_container_el(letters)
    output_container = document.getElementById('output-container')
    output_container.innerHTML = letter_container_el + output_container.innerHTML
}

// UI buttons
function select_letter_btn(tile_index){
    tile = INPUT_CHARS[tile_index]
    // Don't allow tiles to be re-selected
    if(tile.selected) return
    tile.select()
    SELECTION.push(tile.char)
    selection_tile = document.getElementsByClassName('letter-selection letter-unselected')[0]
    selection_tile.classList.remove('letter-unselected')
    selection_tile.innerText = tile.char
}

function clear_selection(){
    // Visually reset selection letters
    selection_tiles = document.getElementsByClassName('letter-selection')
    for(var i = 0; i < selection_tiles.length; i++){
        selection_tiles[i].innerText = DEFAULT_SELECTION_CHAR
        selection_tiles[i].classList.add('letter-unselected')
    }
    // Visually reset input letters
    INPUT_CHARS.forEach(element => {
        element.deselect()
    });
    // Clear selected word from buffer
    SELECTION = []
}

function enter_selection(){
    word = SELECTION.join('')
    if(
        word.length >= MIN_WORD_LENGTH
        && is_word(word)
        && !FOUND_WORDS.includes(word)
    ){
        FOUND_WORDS.push(word)
        render_word_output(SELECTION)
        clear_selection()
    }
    else console.log('Not a word!')
}

window.onload = function(){
    INPUT_CHARS = generate_game_data(SELECTION_COUNT)
}
