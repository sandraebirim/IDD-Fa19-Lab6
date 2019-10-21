# ChatBot

*A lab report by Sandra Ebirim*

## In this Report

To submit your lab, fork [this repository](https://github.com/FAR-Lab/IDD-Fa18-Lab6). You'll need to upload any code you change into your fork, as well as upload a video of a friend or classmate using your chatbot.

## Make the ChatBot your own

**Describe what changes you made to the baseline chatbot here. Don't forget to push your modified code to this repository.**

I changed the baseline chatbot to respond with questions based on a topic that is input. I used npm one-liner-jokes which produces each joke based on an input tag in the form of a dictionary with the joke and the related tags. As there are only 2200 jokes in this database, I also had a fallback condition that accounted for the chance that the user picks a topic that isn't represented in the database. I also allowed the user to quit by answering the question of "What would you like to hear a joke about?" with the word nothing or after 20 questions have been asked. 

## Record someone trying out your ChatBot

**Using a phone or other video device, record someone trying out your ChatBot. Upload that video to this repository and link to it here!**

[Joke Teller with an Attitude Video](https://www.youtube.com/watch?v=gwcDEMw6K44&feature=youtu.be)

---
Starter code by [David Goedicke](mailto:da.goedicke@gmail.com), closely based on work by [Nikolas Martelaro](mailto:nmartelaro@gmail.com) and [Captain Anonymous](https://codepen.io/anon/pen/PEVYXz), who forked original work by [Ian Tairea](https://codepen.io/mrtairea/pen/yJapwv).
