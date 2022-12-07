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
// List of all possible words based on input letters
POSSIBLE_WORDS = []
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

    set_index(index){
        this.index = index;
        this.el = document.getElementById('letter-btn-' + index);
        this.el.innerText = this.char
    }
}

function is_word(word){
    // Determine if the word is in the wordlist
    return WORDLIST[word.toLowerCase()]
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
    output_container = document.getElementById('output-container-words')
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

function shuffle_selection(){
    clear_selection()
    for (var i = INPUT_CHARS.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = INPUT_CHARS[i];
        INPUT_CHARS[i] = INPUT_CHARS[j];
        INPUT_CHARS[j] = temp;
        INPUT_CHARS[i].set_index(i)
        INPUT_CHARS[j].set_index(j)
    }
}

function new_game(){
    // Clear selection container
    clear_selection()
    // Clear any found words
    FOUND_WORDS = []
    // Clear visual found words
    document.getElementById('output-container-words').innerHTML = ''
    // Reset input chars
    INPUT_CHARS = generate_game_data(SELECTION_COUNT)
    // Find all possible words
    POSSIBLE_WORDS = get_possible_words(INPUT_CHARS.map(letter => letter.char))
}

function get_possible_words(chars, branch=''){
    /*
    Recursive depth-first generation of all valid words for a give char list.

    * chars <list>: List of chars from which to generate words.
    * branch <str>: Vertical branch of chars in the tree.
    
    For a given recursion step, `chars` is de-duplicated to avoid building
    identical sub-trees. For example: if chars=[A,A,B,C] and B is the node
    of the current recursion step, then the sub-trees of both A nodes in the
    subsequent recursion step will be identical:

    B ┬ A ┬ C - A
      │   ┕ A - C
      ├ C ┬ A - A
      │   ┕ A > This sub-tree would be a duplicate from node C
      ┕ A > This sub-tree would be a duplicate from node B

    This evidently recudes the number of recursion steps required.

    Consecutive identical characters are however valid, so `chars` can only be
    de-duplicated at the individual node level, not across the tree.

    TODO: Skip branches with illegal letter patterns e.g. c followed by x to
          further reduce unnecessary work (do such combinations even exist?)
    TODO: Would it provide more utility to return a tree structure here?
    */
    next_char_nodes = new Set(chars)
    found = []
    next_char_nodes.forEach(char => {
        word = branch + char
        if(is_word(word) && word.length >= MIN_WORD_LENGTH) found.push(word)
        // Hacky way of generating a new list with the current element hidden
        remaining_chars = chars.filter((c, index) => index != chars.indexOf(char))
        found = found.concat(get_possible_words(remaining_chars, word))
    });

    return found
}

window.onload = function(){
    new_game()
}
