const create = (table, fields, values) => {
  const text = `INSERT INTO ${table}(fields)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING id, firstName, lastName, otherName, phone, email, passportUrl, isAdmin`;
}
