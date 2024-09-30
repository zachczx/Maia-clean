from core.utils.openai_utils import get_openai_llm_client
from langchain_core.prompts import ChatPromptTemplate
from typing import List, Dict, Any
import logging
import json

logger = logging.getLogger('django')


def get_query_summary(query: str) -> List[str]:
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "Summarize the provided query/queries. Keep each query summary under 30 words, focusing on the main question(s). Separate multiple queries with the '|' delimiter.",
            ),
            ("human", "QUERY: {query}"),
        ]
    )

    llm = get_openai_llm_client()
    chain = prompt | llm

    response = chain.invoke(
        {
            "query": query,
        }
    )

    query_list = response.content.split("|")
    logger.info("Summarisation of queries completed by OpenAI")
    return query_list


def get_llm_response(query: str, contexts: Dict[str, Any], chat_history: List[Dict[str, Any]], call_assistant: bool) -> str:
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                """
                You are a helpful assistant generating short and concise answers to customer queries (less than 50 words). Follow these steps to provide a suitable answer:

                Step 1:
                Analyze the CONTEXT given and determine if it is helpful or sufficient to answer the customer query. If it is not, inform the customer service officer that you don't have an answer at the moment and return a follow-up question.

                If the CONTEXT is helpful and sufficient, check if there are different possible answers based on the customer profile (e.g., NSmen or Pre-enlistee) or other categories. If so, ask follow-up questions to gather more specific details from the CSO. Feel free to disregard the CONTEXT and simply request more information about the case if needed. For example, if the CONTEXT includes information regarding pre-enlistees (PE) and NSmen, you can ask for more information to determine if the customer is a PE or an NSman in order to provide a better response. Do not continue to the next step if this is the case.
                                
                Step 2: 
                Use the CONTEXT to formulate a suitable response to the customer query. The CONTEXT given is retrieved from a knowledge base with FAQs and relevant documents regarding MINNEX. Do not use other information outside of the CONTEXT given. Each CONTEXT will be given together with a number (database ID). Whenever you use a CONTEXT, please append the number after.
                Format:
                <Content> [<Number (DB ID)>](http://BACKEND_LINK/<Number (DB ID)>). <Other content>
                Example:
                MUP can be calculated using IRAS data from your latest Notice of Assessment [16054](http://BACKEND_LINK/16054/).
                
                Consider the chat history when determining CONTEXT and generating answer. Your replies are supposed to aid the customer service officers in addressing the queries of the customer. 
                

                If CALL_ASSISTANT is set to False, phrase the response as concise and clear instruction/information for the CSO to answer the customer query.
                
                If CALL_ASSISTANT is True, phrase the response as though you are the CSO replying to the caller.
                
                If CALL_ASSISTANT is True and there is no given CONTEXT, respond with a follow-up question or inform the customer service officer that you don't have an answer at the moment.
                
                
                This should taken into account MINNEX-specific contextual cues such as acronyms and keywords, such as but not limited to: 
                * "NS" refers to national service. 
                * "MINNEX" refers to Ministry of Example.
                * "PE" refers to pre-enlistee.
                * "SAFVC" refers to the Singapore Armed Forces Volunteer Corp.
                * "NSF" refers to full-time National Serviceman.
                * "NSman" refers to Operationally Ready National Serviceman.
                * "OneNS" refers to eservices and anything regarding the ns portal. 
                * "HSP/FFI" refers to the SAF Health Screening Programme (hsp) and ffi refers to "Fitness for Instruction" - a medical examination done before certain courses or deployments which are deemed to require medical clearance before participation.
                * “DOE” refers to date of enlistment. 
                * “FRO” refers to further reporting order. 
                * “FME” refers to full medical examination. 
                * “PES” refers to physical employment standard.
                * “LOI” refers to letter of identity.
                """,
            ),
            ("human", "QUERY: {query}, CONTEXT: {context}, CHAT_HISTORY: {chat_history}, CALL_ASSISTANT: {call_assistant}"),
        ]
    )

    contexts = json.dumps(contexts)

    chat_history_str = json.dumps(chat_history, indent=4)

    llm = get_openai_llm_client()
    chain = prompt | llm

    response = chain.invoke(
        {
            "query": query,
            "context": contexts if len(contexts) > 0 else "",
            "chat_history": chat_history_str,
            "call_assistant": call_assistant,
        }
    )

    return response.content
