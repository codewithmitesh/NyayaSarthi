import os
import sys

import openai
from langchain.chains import ConversationalRetrievalChain, RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.indexes import VectorstoreIndexCreator
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain.llms import OpenAI
from langchain.vectorstores import Chroma

import constants
from langchain.prompts import PromptTemplate

os.environ["OPENAI_API_KEY"] = constants.APIKEY

# Enable to save to disk & reuse the model (for repeated queries on the same data)
PERSIST = False

query = None
if len(sys.argv) > 1:
  query = sys.argv[1]

if PERSIST and os.path.exists("persist"):
  print("Reusing index...\n")
  vectorstore = Chroma(persist_directory="persist", embedding_function=OpenAIEmbeddings())
  index = VectorStoreIndexWrapper(vectorstore=vectorstore)
else:
  loader = TextLoader("data/ipc-data.txt") # Use this line if you only need data.txt
  #loader = DirectoryLoader("data/")
  if PERSIST:
    index = VectorstoreIndexCreator(vectorstore_kwargs={"persist_directory":"persist"}).from_loaders([loader])
  else:
    index = VectorstoreIndexCreator().from_loaders([loader])

template = """
You are a law enforcing crime evaluater. Based on the data given to your about various punishments for various offences,
you have to take the user input which will be description of the crime, compare it with the corresponding charges mentioned in the data given and give me a severity level of the offence between 1-10. 
Where 1 being that the offence is not very serious and can be overlooked and 10 being that the charges are quite serious and the offense is quite severe and should be punished urgently.

All the information and description on each section is mentioned after section_[]. Where the number in square brackets can be anything.

Give the response in a single sentence where you explain the severity of the crime and rate it from 1-10.

Measure the severity of the case based on how long punishment one can get and how many sections are applicable on the case.
Everything is directly proportional to the severity value.

Make sure to give the response in a single sentence like below:-
Severity of the case out of 1-10:- (mention your severity here)

Below is a message I received from the prospect:
{message}

"""

prompt = PromptTemplate(
    input_variables=["message"],
    template=template
)

chain = ConversationalRetrievalChain.from_llm(
  llm=ChatOpenAI(model="gpt-3.5-turbo-1106"),
  retriever=index.vectorstore.as_retriever(search_kwargs={"k": 2}),
)

chat_history = []
while True:
  if not query:
    query = input("Prompt: ")
  if query in ['quit', 'q', 'exit']:
    sys.exit()
  result = chain({"question": query, "chat_history": chat_history})
  print(result['answer'])

  chat_history.append((query, result['answer']))
  query = None