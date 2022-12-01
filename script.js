// Representative of distribution in English language
// TODO: Tidy this up
CHARS = "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNSSSSSSSSSSSSSSSSSSSSSSSSSSSSSLLLLLLLLLLLLLLLLLLLLLLLLLLLLCCCCCCCCCCCCCCCCCCCCCCCUUUUUUUUUUUUUUUUUUUDDDDDDDDDDDDDDDDDPPPPPPPPPPPPPPPPMMMMMMMMMMMMMMMHHHHHHHHHHHHHHHGGGGGGGGGGGGGBBBBBBBBBBBFFFFFFFFFYYYYYYYYYWWWWWWWKKKKKKVVVVVXXZZJJQQ"
// Number of chars to play with
SELECTION_COUNT = 10
// The chars which the user can use to input a word
INPUT_CHARS = []
// Selection
SELECTION = []

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
}

function is_word(word){
    // Determine if the word is in the wordlist
    return WORDLIST.includes(word)
}

function generate_game_data(num_chars){
    // Generate a list of chars for game and set game data
    chars = []
    for(i = 0; i < num_chars; i++) chars.push(new Letter(i))
    return chars
}

// UI buttons
function select_letter_btn(tile_index){
    tile = INPUT_CHARS[tile_index]
    // Don't allow tiles to be re-selected
    if(tile.selected) return
    tile.select()
    SELECTION.push(tile.char)
    selection_tile = document.getElementsByClassName('letter-selection unselected')[0]
    selection_tile.classList.remove('unselected')
    selection_tile.innerText = tile.char
}

window.onload = function(){
    INPUT_CHARS = generate_game_data(SELECTION_COUNT)
}
