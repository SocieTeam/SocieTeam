function NewEvent () {
    return (
        <div>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/290px-SunsetPark.jpg' alt='park'></img>
            <form>
                <label for='title'>Title:</label><br></br>
                <input type='text' id = 'title' placeholder = 'Ex: Cyber Security Talk'></input><br></br>
                
                <p>Is it a Virtual?</p>
                <input type="radio" id="isVirtual" name="isVirtual" value="true"></input>
                <label for = 'isVirtual'>Yes</label>
                <input type="radio" id="isVirtual" name="isVirtual" value="false"></input>
                <label for = 'isVirtual'>False</label><br></br>

                <label for='location'>Location/Meeting Link</label>
                <input type = 'text' id='location' name = 'location' placeholder = '1234 A BLVD'></input><br></br>

                <label for = 'description'>Event Description</label>
                <textarea id = 'description' name = 'description'></textarea>
            </form>
        </div>
    )
} 

export default NewEvent;