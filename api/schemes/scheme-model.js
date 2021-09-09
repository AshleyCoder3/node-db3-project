const db = require('../../data/db-config');

async function find() {
  const allTasks = await db('schemes as sc') // main table
    .leftJoin('steps as st', 'sc.scheme_id', '=', 'st.scheme_id')//LEFT JOIN steps as st ON sc.scheme_id = st.scheme_id(choose 2nd table to add in)
    .select('sc.*')// SELECT sc.*,FROM schemes as sc
    .count('st.step_id as number_of_steps')//count(st.step_id) as number_of_steps
    .groupBy('sc.scheme_id')//GROUP BY sc.scheme_id
    .orderBy('sc.scheme_id');//ORDER BY sc.scheme_id ASC;
  return allTasks;
}

async function findById(scheme_id) { // EXERCISE B
  const rows = await db('schemes as sc') // main table
    .leftJoin('steps as st', 'sc.scheme_id', '=', 'st.scheme_id')//LEFT JOIN steps as st ON sc.scheme_id = st.scheme_id(choose 2nd table to add in)
    .select('st.*', 'sc.scheme_name', 'sc.scheme_id as id')// SELECT st.*, sc.scheme_name FROM schemes as sc
    .where('sc.scheme_id', scheme_id)//WHERE sc.scheme_id = 1
    .orderBy('st.step_number');// ORDER BY st.step_number ASC;
  const stepsMap = rows[0].step_id !== null ? rows.map(item => {
    return {
      step_id: item.step_id,
      step_number: item.step_number,
      instructions: item.instructions
    };
  }) : [];
  const result = {
    scheme_id: rows[0].scheme_id || rows[0].id,
    scheme_name: rows[0].scheme_name,
    steps: stepsMap
  };
  return result;
}


async function findSteps(scheme_id) { // EXERCISE C
  const rows = await db('steps as st') // main table
    .leftJoin('schemes as sc', 'sc.scheme_id', '=', 'st.scheme_id')//LEFT JOIN steps as st ON sc.scheme_id = st.scheme_id(choose 2nd table to add in)
    .select('st.*', 'sc.scheme_name', 'sc.scheme_id as id')// SELECT st.*, sc.scheme_name FROM schemes as sc
    .where('sc.scheme_id', scheme_id)//WHERE sc.scheme_id = 1
    .orderBy('st.step_number');// ORDER BY st.step_number ASC;
  const result = rows.map(item => {
    return {
      step_id: item.step_id,
      step_number: item.step_number,
      instructions: item.instructions,
      scheme_name: item.scheme_name
    };
  });
  return result;
}

async function add(scheme) { // EXERCISE D
  const [id] = await db('schemes').insert(scheme);
  return findById(id);
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
