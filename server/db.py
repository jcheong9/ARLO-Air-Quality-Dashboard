import psycopg2

conn = psycopg2.connect(host="localhost", 
                        port = 5432, 
                        database="postgres", 
                        user="postgres", 
                        password="admin")
cur = conn.cursor()

# A sample query of all data from the "vendors" table in the "suppliers" database
cur.execute("SELECT * FROM artist")
query_results = cur.fetchall()
print(query_results)

# Close the cursor and connection to so the server can allocate
# bandwidth to other requests
cur.close()
conn.close()