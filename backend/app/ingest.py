from .content import CHUNKS
from .rag.retrieve import (
    add_documents,
    clear_collection,
    get_document_count,
)


def main() -> None:

    print()
    print("===================================")
    print("Honka ChromaDB Ingestion")
    print("===================================")
    print()

    # -----------------------------------------------------
    # Validate content
    # -----------------------------------------------------

    if not CHUNKS:
        print(
            "No chunks found in app/content.py"
        )
        return

    print(
        f"Loaded {len(CHUNKS)} predefined chunks."
    )

    # -----------------------------------------------------
    # Clear existing collection
    # -----------------------------------------------------

    print()
    print(
        "Clearing existing ChromaDB collection..."
    )

    clear_collection()

    print(
        "Collection cleared."
    )

    # -----------------------------------------------------
    # IDs
    # -----------------------------------------------------

    ids = [
        f"resume_chunk_{index}"
        for index in range(len(CHUNKS))
    ]

    # -----------------------------------------------------
    # Metadata
    # -----------------------------------------------------

    metadatas = [
        {
            "source": "resume",
            "chunk_index": index,
        }
        for index in range(len(CHUNKS))
    ]

    # -----------------------------------------------------
    # Insert
    # -----------------------------------------------------

    print()
    print(
        "Generating embeddings and storing documents..."
    )

    add_documents(
        documents=CHUNKS,
        ids=ids,
        metadatas=metadatas,
    )

    # -----------------------------------------------------
    # Verify
    # -----------------------------------------------------

    count = get_document_count()

    print()
    print("===================================")
    print("Ingestion complete.")
    print("===================================")
    print()
    print(
        f"Source chunks : {len(CHUNKS)}"
    )
    print(
        f"ChromaDB docs : {count}"
    )
    print()


if __name__ == "__main__":
    main()